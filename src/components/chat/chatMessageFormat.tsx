import { type ReactNode } from 'react'

function parseInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /\*\*(.+?)\*\*|`([^`]+)`|\*(.+?)\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let index = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const key = `${keyPrefix}-${index++}`
    if (match[1]) nodes.push(<strong key={key}>{match[1]}</strong>)
    else if (match[2]) nodes.push(<code key={key} className="chat-md-code">{match[2]}</code>)
    else if (match[3]) nodes.push(<em key={key}>{match[3]}</em>)
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes.length ? nodes : [text]
}

function normalizeListBreaks(text: string): string {
  return text
    .replace(/([.:!?])\s+-\s+(?=\*\*|[A-Za-z])/g, '$1\n- ')
    .replace(/([^\n])\s+-\s+(?=\*\*)/g, '$1\n- ')
}

function parseTableRow(line: string): string[] | null {
  const trimmed = line.trim()
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return null
  const inner = trimmed.slice(1, -1)
  return inner.split('|').map((cell) => cell.trim())
}

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return false
  const inner = trimmed.slice(1, -1)
  return inner
    .split('|')
    .every((cell) => /^:?-{3,}:?$/.test(cell.trim()))
}

export function formatChatMessage(text: string): ReactNode {
  const normalized = normalizeListBreaks(text.trim())
  const lines = normalized.split('\n')
  const blocks: ReactNode[] = []
  let listItems: string[] = []
  let blockIndex = 0

  const flushList = () => {
    if (!listItems.length) return
    blocks.push(
      <ul key={`list-${blockIndex++}`} className="chat-md-list">
        {listItems.map((item, itemIndex) => (
          <li key={itemIndex}>{parseInlineMarkdown(item, `li-${blockIndex}-${itemIndex}`)}</li>
        ))}
      </ul>,
    )
    listItems = []
  }

  const renderTable = (headerCells: string[], bodyRows: string[][]) => {
    blocks.push(
      <div key={`table-wrap-${blockIndex}`} className="chat-md-table-wrap">
        <table key={`table-${blockIndex++}`} className="chat-md-table">
          <thead>
            <tr>
              {headerCells.map((cell, idx) => (
                <th key={`th-${idx}`}>{parseInlineMarkdown(cell, `th-${idx}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIdx) => (
              <tr key={`tr-${rowIdx}`}>
                {row.map((cell, cellIdx) => (
                  <td key={`td-${rowIdx}-${cellIdx}`}>
                    {parseInlineMarkdown(cell, `td-${rowIdx}-${cellIdx}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    )
  }

  const renderHeader = (level: number, text: string) => {
    const safeText = text.trim()
    if (level === 1) {
      blocks.push(
        <h1 key={`h-${blockIndex++}`} className="chat-md-h1">
          {parseInlineMarkdown(safeText, `h1-${blockIndex}`)}
        </h1>,
      )
    } else if (level === 2) {
      blocks.push(
        <h2 key={`h-${blockIndex++}`} className="chat-md-h2">
          {parseInlineMarkdown(safeText, `h2-${blockIndex}`)}
        </h2>,
      )
    } else if (level === 3) {
      blocks.push(
        <h3 key={`h-${blockIndex++}`} className="chat-md-h3">
          {parseInlineMarkdown(safeText, `h3-${blockIndex}`)}
        </h3>,
      )
    } else {
      blocks.push(
        <h4 key={`h-${blockIndex++}`} className="chat-md-h4">
          {parseInlineMarkdown(safeText, `h4-${blockIndex}`)}
        </h4>,
      )
    }
  }

  let i = 0
  while (i < lines.length) {
    const trimmed = lines[i].trim()

    const headerRow = parseTableRow(trimmed)
    if (headerRow && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const bodyRows: string[][] = []
      let j = i + 2
      while (j < lines.length) {
        const row = parseTableRow(lines[j])
        if (!row) break
        bodyRows.push(row)
        j += 1
      }
      flushList()
      renderTable(headerRow, bodyRows)
      i = j
      continue
    }

    const headerMatch = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (headerMatch) {
      flushList()
      renderHeader(headerMatch[1].length, headerMatch[2])
      i += 1
      continue
    }

    const bulletMatch = trimmed.match(/^[-•*]\s+(.+)/)
    if (bulletMatch) {
      listItems.push(bulletMatch[1])
      i += 1
      continue
    }

    flushList()

    if (!trimmed) {
      i += 1
      continue
    }

    blocks.push(
      <p key={`p-${blockIndex++}`} className="chat-md-p">
        {parseInlineMarkdown(trimmed, `p-${blockIndex}`)}
      </p>,
    )
    i += 1
  }

  flushList()
  return blocks.length ? <>{blocks}</> : null
}

export function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-label="Eveia.AI is typing">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  )
}
