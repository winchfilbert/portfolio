import { useState, useRef, useEffect, useCallback } from 'react'
import type { ReactNode, KeyboardEvent, FormEvent } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { processCommand, getWelcomeBanner, AVAILABLE_COMMANDS } from '../lib/commands'

type TerminalEntry = {
  id: number
  type: 'input' | 'output' | 'boot'
  command?: string
  content: ReactNode
}

export function Terminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([])
  const [inputValue, setInputValue] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBooting, setIsBooting] = useState(true)
  const [idCounter, setIdCounter] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Modal states
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const [activeProject, setActiveProject] = useState<any | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const getNextId = useCallback(() => {
    setIdCounter((prev) => prev + 1)
    return idCounter
  }, [idCounter])

  const executeCommand = useCallback(
    (cmd: string) => {
      const command = cmd.trim()

      if (!command) {
        setEntries((prev) => [
          ...prev,
          {
            id: getNextId(),
            type: 'input' as const,
            command: '',
            content: null,
          },
        ])
        return
      }

      // Add to history
      setCommandHistory((prev) => [...prev, command])
      setHistoryIndex(-1)

      const result = processCommand(command, [...commandHistory, command])

      if (result.clear) {
        setEntries([])
        return
      }

      const newEntries: TerminalEntry[] = [
        {
          id: getNextId(),
          type: 'input' as const,
          command,
          content: null,
        },
      ]

      if (result.output) {
        newEntries.push({
          id: getNextId() + 1,
          type: 'output' as const,
          content: result.output,
        })
      }

      setEntries((prev) => [...prev, ...newEntries])
    },
    [commandHistory, getNextId],
  )

  // Boot sequence
  useEffect(() => {
    const bootLines = [
      { text: 'BIOS v2.0.26 — Initializing...', delay: 100 },
      { text: 'Loading kernel modules...', delay: 300 },
      { text: 'Mounting filesystem /dev/portfolio...', delay: 500 },
      { text: 'Starting network services... [OK]', delay: 700 },
      { text: 'Loading profile data... [OK]', delay: 900 },
      { text: 'Starting terminal emulator... [OK]', delay: 1100 },
      { text: '', delay: 1300 },
    ]

    const timeouts: ReturnType<typeof setTimeout>[] = []

    bootLines.forEach(({ text, delay }, i) => {
      const t = setTimeout(() => {
        setEntries((prev) => [
          ...prev,
          {
            id: i,
            type: 'boot' as const,
            content: (
              <div className="text-dim" style={{ animationDelay: `${i * 0.05}s` }}>
                {text ? (
                  <>
                    <span className="text-gray">[{new Date().toISOString().split('T')[1]?.slice(0, 8)}]</span>{' '}
                    {text}
                  </>
                ) : null}
              </div>
            ),
          },
        ])
      }, delay)
      timeouts.push(t)
    })

    const bannerTimeout = setTimeout(() => {
      setEntries((prev) => [
        ...prev,
        {
          id: bootLines.length,
          type: 'output' as const,
          content: getWelcomeBanner(),
        },
      ])
      setIsBooting(false)
    }, 1500)
    timeouts.push(bannerTimeout)

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [entries])

  // Event listeners for modals & commands
  useEffect(() => {
    const handleOpenLightbox = (e: Event) => {
      setLightboxImg((e as CustomEvent).detail)
    }
    const handleOpenProject = (e: Event) => {
      setActiveProject((e as CustomEvent).detail)
      setCurrentSlide(0)
    }
    const handleRunCommand = (e: Event) => {
      executeCommand((e as CustomEvent).detail)
    }

    window.addEventListener('open-lightbox', handleOpenLightbox)
    window.addEventListener('open-project', handleOpenProject)
    window.addEventListener('run-command', handleRunCommand)

    return () => {
      window.removeEventListener('open-lightbox', handleOpenLightbox)
      window.removeEventListener('open-project', handleOpenProject)
      window.removeEventListener('run-command', handleRunCommand)
    }
  }, [executeCommand])

  // Auto switch project carousel slides
  useEffect(() => {
    if (!activeProject || activeProject.images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeProject.images.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [activeProject])

  // Auto-focus input
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isBooting])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      executeCommand(inputValue)
      setInputValue('')
    },
    [inputValue, executeCommand],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // Arrow up — navigate history backward
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (commandHistory.length === 0) return
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex] ?? '')
      }

      // Arrow down — navigate history forward
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex === -1) return
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInputValue('')
        } else {
          setHistoryIndex(newIndex)
          setInputValue(commandHistory[newIndex] ?? '')
        }
      }

      // Tab — autocomplete
      if (e.key === 'Tab') {
        e.preventDefault()
        const current = inputValue.toLowerCase()
        if (!current) return

        const matches = AVAILABLE_COMMANDS.filter((cmd) =>
          cmd.startsWith(current),
        )

        if (matches.length === 1) {
          setInputValue(matches[0] ?? '')
        } else if (matches.length > 1) {
          // Show autocomplete suggestions
          setEntries((prev) => [
            ...prev,
            {
              id: getNextId(),
              type: 'input' as const,
              command: inputValue,
              content: null,
            },
            {
              id: getNextId() + 1,
              type: 'output' as const,
              content: (
                <div className="text-gray">
                  {matches.map((m, i) => (
                    <span key={m}>
                      <span className="text-yellow">{m}</span>
                      {i < matches.length - 1 ? '  ' : ''}
                    </span>
                  ))}
                </div>
              ),
            },
          ])
        }
      }
    },
    [commandHistory, historyIndex, inputValue, getNextId],
  )

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const renderPrompt = () => (
    <span className="terminal-prompt">
      <span className="prompt-user">filbert</span>
      <span className="prompt-separator">@</span>
      <span className="prompt-path">portfolio</span>
      <span className="prompt-separator">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-symbol">$ </span>
    </span>
  )

  return (
    <div className="terminal-wrapper" onClick={focusInput}>
      <div className="terminal-chrome">

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div 
            className="modal-backdrop" 
            onClick={() => setLightboxImg(null)}
          >
            <button 
              className="modal-close" 
              onClick={() => setLightboxImg(null)}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <img 
              src={lightboxImg} 
              alt="Fullscreen view" 
              className="lightbox-image" 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}

        {/* Project Detail Modal */}
        {activeProject && (
          <div 
            className="modal-backdrop" 
            onClick={() => setActiveProject(null)}
          >
            <div 
              className="project-modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{activeProject.name}</h3>
                <button 
                  onClick={() => setActiveProject(null)} 
                  className="modal-close-btn"
                  aria-label="Close details"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Carousel */}
              <div className="carousel-container">
                <div 
                  className="carousel-slide"
                  style={{ backgroundImage: `url(${activeProject.images[currentSlide]})` }}
                  onClick={() => setLightboxImg(activeProject.images[currentSlide])}
                />
                
                {activeProject.images.length > 1 && (
                  <>
                    <button 
                      className="carousel-btn carousel-btn--left"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
                      }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      className="carousel-btn carousel-btn--right"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => (prev + 1) % activeProject.images.length);
                      }}
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Indicators */}
                    <div className="carousel-indicators">
                      {activeProject.images.map((_: any, idx: number) => (
                        <span 
                          key={idx} 
                          className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(idx);
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details */}
              <div className="project-modal-details">
                <div className="text-magenta" style={{ marginBottom: '12px', fontSize: '14px' }}>
                  <strong>Stack:</strong> [{activeProject.tech}]
                </div>
                
                <div className="text-white" style={{ marginBottom: '20px', lineHeight: 1.6, fontSize: '14px' }}>
                  {activeProject.longDescription}
                </div>

                <div className="output-subheader" style={{ marginBottom: '8px', fontSize: '14px' }}>Key Features & Impact:</div>
                <ul className="project-feature-list">
                  {activeProject.keyFeatures.map((feat: string, idx: number) => (
                    <li key={idx} className="project-feature-item">{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Title bar */}
        <div className="terminal-titlebar">
          <div className="terminal-dots">
            <div className="terminal-dot terminal-dot--red" />
            <div className="terminal-dot terminal-dot--yellow" />
            <div className="terminal-dot terminal-dot--green" />
          </div>
          <div className="terminal-title">
            filbert@portfolio: ~/terminal — zsh
          </div>
          <div style={{ width: 52 }} />
        </div>

        {/* Output area */}
        <div className="terminal-body" ref={bodyRef}>
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.type === 'input' && (
                <div className="terminal-line terminal-line--input">
                  {renderPrompt()}
                  <span className="terminal-command">{entry.command}</span>
                </div>
              )}
              {entry.content}
            </div>
          ))}
        </div>

        {/* Input line */}
        {!isBooting && (
          <form onSubmit={handleSubmit} className="terminal-input-area">
            {renderPrompt()}
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setHistoryIndex(-1)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
        )}
      </div>
    </div>
  )
}
