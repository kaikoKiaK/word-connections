'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import data from '../data/words.json'

type Category = (typeof data)[number]['categories'][number]

const difficultyColors: Record<string, string> = {
  yellow: 'bg-yellow-400 text-yellow-900',
  green: 'bg-green-500 text-white',
  blue: 'bg-blue-500 text-white',
  purple: 'bg-purple-600 text-white',
}

const MAX_ATTEMPTS = 4

export default function Game() {
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const puzzle = data[puzzleIndex]
  const allWords = puzzle.categories.flatMap((cat) => cat.words)

  const [shuffledWords, setShuffledWords] = useState<string[]>(() =>
    [...allWords].sort(() => Math.random() - 0.5),
  )
  const [selected, setSelected] = useState<string[]>([])
  const [solved, setSolved] = useState<Category[]>([])
  const [hintWords, setHintWords] = useState<string[]>([])
  const [attempts, setAttempts] = useState(0)

  const [revealed, setRevealed] = useState(false)
  const [modalDismissed, setModalDismissed] = useState(false)
  const [wasLost, setWasLost] = useState(false)
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const solvedWords = solved.flatMap((cat) => cat.words)
  const remainingWords = shuffledWords.filter((w) => !solvedWords.includes(w))
  const gameLost = attempts >= MAX_ATTEMPTS
  const gameWon =
    !gameLost && !wasLost && solved.length === puzzle.categories.length
  const showLostModal = gameLost && !modalDismissed

  useEffect(() => {
    if (gameWon) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.55 },
      })
    }
  }, [gameWon])

  function toggle(word: string) {
    if (gameLost) return
    setSelected((prev) =>
      prev.includes(word)
        ? prev.filter((w) => w !== word)
        : prev.length < 4
          ? [...prev, word]
          : prev,
    )
  }

  function check() {
    const matchedCat = puzzle.categories.find(
      (cat) =>
        cat.words.length === selected.length &&
        cat.words.every((w) => selected.includes(w)),
    )
    if (matchedCat) {
      setSolved((prev) => [...prev, matchedCat])
      setSelected([])
      setHintWords([])
    } else {
      const next = attempts + 1
      setAttempts(next)
      if (next >= MAX_ATTEMPTS) setWasLost(true)

      // Find the category with the most selected words (hint if >= 2)
      let bestCat: Category | null = null
      let bestOverlap = 1
      for (const cat of puzzle.categories) {
        if (solved.some((s) => s.title === cat.title)) continue
        const overlap = cat.words.filter((w) => selected.includes(w)).length
        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestCat = cat
        }
      }

      if (bestCat) {
        const matching = bestCat.words.filter((w) => selected.includes(w))
        setSelected(matching)
        setHintWords(matching)
      } else {
        setSelected([])
        setHintWords([])
      }
    }
  }

  function reveal() {
    setSolved(puzzle.categories)
    setRevealed(true)
    setModalDismissed(true)
  }

  function reset() {
    const words = data[puzzleIndex].categories.flatMap((cat) => cat.words)
    setShuffledWords([...words].sort(() => Math.random() - 0.5))
    setSelected([])
    setSolved([])
    setHintWords([])
    setAttempts(0)
    setRevealed(false)
    setModalDismissed(true)
    // wasLost intentionally kept so Revelar stays visible
  }

  function nextGame() {
    const nextIndex = (puzzleIndex + 1) % data.length
    const words = data[nextIndex].categories.flatMap((cat) => cat.words)
    setPuzzleIndex(nextIndex)
    setShuffledWords([...words].sort(() => Math.random() - 0.5))
    setSelected([])
    setSolved([])
    setHintWords([])
    setAttempts(0)
    setRevealed(false)
    setModalDismissed(false)
    setWasLost(false)
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center px-4'>
      <div className='absolute top-4 left-1/2 -translate-x-1/2'>
        <button
          onClick={() => setShowHowToPlay(true)}
          className='px-5 py-2 rounded-lg font-semibold text-sm bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 transition-colors'
        >
          ¿Cómo jugar?
        </button>
      </div>

      {showHowToPlay && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
          onClick={() => setShowHowToPlay(false)}
        >
          <div
            className='bg-white dark:bg-neutral-800 rounded-2xl p-8 flex flex-col gap-4 shadow-xl max-w-md w-full mx-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                ¿Cómo jugar?
              </h2>
              <button
                onClick={() => setShowHowToPlay(false)}
                className='text-neutral-500 hover:text-neutral-900 dark:hover:text-white text-2xl leading-none'
              >
                ✕
              </button>
            </div>
            <p className='text-neutral-700 dark:text-neutral-300'>
              Encuentra los cuatro grupos de cuatro palabras que tienen algo en
              común.
            </p>
            <ul className='text-neutral-700 dark:text-neutral-300 flex flex-col gap-2 list-disc list-inside'>
              <li>
                Selecciona cuatro palabras y pulsa <strong>Comprobar</strong>{' '}
                para ver si forman un grupo.
              </li>
              <li>Cada palabra pertenece a exactamente un grupo.</li>
              <li>
                Los grupos tienen un color según su dificultad: amarillo
                (fácil), verde, azul y morado (difícil).
              </li>
              <li>
                Tienes <strong>{MAX_ATTEMPTS} intentos</strong> antes de perder.
                ¡Úsalos bien!
              </li>
              <li>
                Si dos o más palabras de tu selección pertenecen al mismo grupo,
                se resaltarán en verde como pista.
              </li>
            </ul>
            <button
              onClick={() => setShowHowToPlay(false)}
              className='mt-2 px-8 py-3 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors self-center'
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      )}
      {gameWon && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
          <div className='bg-white dark:bg-neutral-800 rounded-2xl p-10 flex flex-col items-center gap-6 shadow-xl'>
            <p className='text-3xl font-bold text-neutral-900 dark:text-white'>
              ¡Enhorabuena!
            </p>
            <button
              onClick={nextGame}
              className='px-8 py-3 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors'
            >
              Siguiente juego
            </button>
          </div>
        </div>
      )}
      {showLostModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
          onClick={() => setModalDismissed(true)}
        >
          <div
            className='bg-white dark:bg-neutral-800 rounded-2xl p-10 flex flex-col items-center gap-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <p className='text-3xl font-bold text-neutral-900 dark:text-white'>
              Perdiste
            </p>
            <button
              onClick={reset}
              className='px-8 py-3 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors'
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}
      <div className='flex flex-col gap-2 w-full max-w-2xl'>
        <div className='flex justify-center gap-3 mb-2'>
          {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
            <div
              key={i}
              className={[
                'w-5 h-5 rounded-full border-2',
                i < attempts
                  ? 'bg-red-500 border-red-500'
                  : 'bg-transparent border-neutral-400 dark:border-neutral-500',
              ].join(' ')}
            />
          ))}
        </div>
        {solved.map((cat) => (
          <div
            key={cat.title}
            className={`grid grid-cols-4 gap-2 rounded-lg p-3 ${difficultyColors[cat.difficulty]}`}
          >
            <div className='col-span-4 text-center font-bold uppercase text-sm tracking-wide'>
              {cat.title}
            </div>
            {cat.words.map((word) => (
              <div
                key={word}
                className='h-12 sm:h-14 flex items-center justify-center rounded font-bold text-xs sm:text-sm tracking-wide uppercase bg-white/20 px-1 text-center'
              >
                {word}
              </div>
            ))}
          </div>
        ))}

        <div className='grid grid-cols-4 gap-2'>
          {remainingWords.map((word) => {
            const isSelected = selected.includes(word)
            const isHint = isSelected && hintWords.includes(word)
            const hintCat = isHint
              ? puzzle.categories.find((cat) => cat.words.includes(word))
              : null
            return (
              <button
                key={word}
                onClick={() => toggle(word)}
                className={[
                  'w-full h-16 sm:h-20 rounded-lg font-bold text-xs sm:text-sm tracking-wide uppercase transition-colors',
                  hintCat
                    ? difficultyColors[hintCat.difficulty]
                    : isSelected
                      ? 'bg-neutral-700 text-white dark:bg-neutral-200 dark:text-neutral-900'
                      : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600',
                ].join(' ')}
              >
                {word}
              </button>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col items-center gap-3 mt-8 w-full max-w-2xl'>
        <div className='flex gap-3 w-full'>
          <button
            onClick={() => {
              setSelected([])
              setHintWords([])
            }}
            className='flex-1 py-3 rounded-lg font-semibold bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 transition-colors'
          >
            Limpiar seleccion
          </button>
          <button
            onClick={revealed ? nextGame : check}
            className='flex-1 py-3 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors'
          >
            {revealed ? 'Siguiente juego' : 'Comprobar'}
          </button>
        </div>
        {wasLost && !revealed && (
          <button
            onClick={reveal}
            className='px-10 py-3 rounded-lg font-semibold bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 transition-colors'
          >
            Revelar
          </button>
        )}
      </div>
    </main>
  )
}
