'use client'

import { useContext, useEffect, useState } from 'react'
import hljs from 'highlight.js/lib/core'
import javascriptLang from 'highlight.js/lib/languages/javascript'
import styles from './styles.module.scss'
import { ThemeContext } from '@/context/ThemeContext'

interface CodeBlockProps {
  code: string
}

hljs.registerLanguage('javascript', javascriptLang)

export default function CodeBlock({ code }: CodeBlockProps) {
  const [hlCode, setHlCode] = useState('')
  const { currentTheme } = useContext(ThemeContext)

  useEffect(() => {
    const highlightedCode = hljs.highlight(code, { language: 'javascript' }).value
    setHlCode(highlightedCode)
  }, [currentTheme])

  return <pre className={`${styles.codeContainer} hl-theme-${currentTheme}`} dangerouslySetInnerHTML={{ __html: hlCode }} />
}
