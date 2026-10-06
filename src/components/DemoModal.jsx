import { useEffect, useState, createContext, useContext } from 'react'
import { DemoModal } from './modals/DemoModal.jsx'
import { ContactModal } from './modals/ContactModal.jsx'

const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
})

export function DemoModalProvider({ children }) {
  const [modalType, setModalType] = useState(null)

  const openModal = (type = 'demo') => setModalType(type)
  const closeModal = () => setModalType(null)

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (e.target.closest('.form-overlay') || e.target.closest('.form-modal')) return

      const target = e.target.closest('a, button')
      if (!target) return

      const text = (target.textContent || '').trim().toLowerCase()
      const href = (target.getAttribute('href') || '').toLowerCase()

      const isSendMsg =
        text.includes('send us a message') ||
        text === 'send message'

      const isDemoBtn =
        text.includes('request a private demo') ||
        text.includes('request for a private demo') ||
        text.includes('request a demo') ||
        text.includes('request demo') ||
        text.includes('request pricing') ||
        text.includes('request private demo') ||
        href.includes('#request-demo')

      if (isSendMsg) {
        if (href.includes('/contact') || href.includes('#send-message')) return
        e.preventDefault()
        window.location.assign('/contact#send-message')
      } else if (isDemoBtn) {
        e.preventDefault()
        openModal('demo')
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <DemoModal open={modalType === 'demo'} onClose={closeModal} />
      <ContactModal open={modalType === 'message'} onClose={closeModal} />
    </ModalContext.Provider>
  )
}

export function useDemoModal() {
  return useContext(ModalContext)
}
