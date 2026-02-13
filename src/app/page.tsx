'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import {
  Download,
  Copy,
  HelpCircle,
  Linkedin,
  MessageCircle,
  QrCode,
  Save,
  Trash2,
  Eye,
  Layout,
  Share2,
  ChevronDown,
  ExternalLink,
  Smartphone,
  Monitor,
  History,
  Check,
  X,
} from 'lucide-react'
import { toPng, toJpeg } from 'html-to-image'
import QRCode from 'qrcode'
import { useAuth } from '@/hooks/use-auth'
import { LogIn, LogOut } from 'lucide-react'

// Types
interface FormData {
  nome: string
  sobrenome: string
  area: string
  email: string
  telefone: string
  linkedin: string
  whatsapp: string
}

interface SavedSignature {
  id: string
  name: string
  data: FormData
  template: string
  theme: string
  version: number
  versions: SignatureVersion[]
  createdAt: string
  updatedAt: string
}

interface SignatureVersion {
  data: FormData
  template: string
  theme: string
  savedAt: string
}

type TemplateType = 'classic' | 'modern' | 'minimal' | 'corporate'
type ThemeType = 'branco' | 'azul' | 'dark'
type PreviewMode = 'desktop' | 'mobile'

// Constants - NESS Areas with recommended templates
const AREAS = [
  { value: 'ceo', label: 'CEO | Chief Executive Officer', template: 'corporate' as TemplateType },
  { value: 'cfo', label: 'CFO | Chief Financial Officer', template: 'corporate' as TemplateType },
  { value: 'cto', label: 'CTO | Chief Technology Officer', template: 'modern' as TemplateType },
  { value: 'coo', label: 'COO | Chief Operating Officer', template: 'corporate' as TemplateType },
  { value: 'cmo', label: 'CMO | Chief Marketing Officer', template: 'modern' as TemplateType },
  { value: 'cio', label: 'CIO | Chief Information Officer', template: 'corporate' as TemplateType },
  { value: 'cso', label: 'CSO | Chief Security Officer', template: 'corporate' as TemplateType },
  { value: 'chro', label: 'CHRO | Chief Human Resources Officer', template: 'modern' as TemplateType },
  { value: 'cpo', label: 'CPO | Chief Product Officer', template: 'modern' as TemplateType },
  { value: 'cdo', label: 'CDO | Chief Data Officer', template: 'modern' as TemplateType },
  { value: 'secops', label: 'n.secops | Security Operations', template: 'classic' as TemplateType },
  { value: 'infraops', label: 'n.infraops | Infrastructure Operations', template: 'classic' as TemplateType },
  { value: 'devarch', label: 'n.devarch | Development Architecture', template: 'modern' as TemplateType },
  { value: 'autoops', label: 'n.autoops | Automation Operations', template: 'classic' as TemplateType },
  { value: 'privacy', label: 'n.privacy | Privacy & Compliance', template: 'classic' as TemplateType },
  { value: 'cirt', label: 'n.cirt | Cyber Incident Response', template: 'classic' as TemplateType },
  { value: 'discovery', label: 'n.discovery | Digital Discovery', template: 'classic' as TemplateType },
  { value: 'operations', label: 'Operations | Infrastructure & IT Security', template: 'classic' as TemplateType },
  { value: 'security', label: 'IT Security & Governance', template: 'classic' as TemplateType },
  { value: 'forensic', label: 'IT Security & Forensic', template: 'classic' as TemplateType },
  { value: 'finance', label: 'Backoffice | Finance', template: 'minimal' as TemplateType },
  { value: 'hr', label: 'Backoffice | HR', template: 'minimal' as TemplateType },
  { value: 'facilities', label: 'Backoffice | Facilities', template: 'minimal' as TemplateType },
]

const STORAGE_KEY = 'ness-signatures'

// Template preview components
const TemplateThumbnails = ({ selected, onSelect }: { selected: TemplateType; onSelect: (t: TemplateType) => void }) => {
  const templates: { id: TemplateType; name: string; icon: string }[] = [
    { id: 'classic', name: 'Clássico', icon: '▤' },
    { id: 'modern', name: 'Moderno', icon: '▦' },
    { id: 'minimal', name: 'Minimal', icon: '▢' },
    { id: 'corporate', name: 'Corporativo', icon: '▣' },
  ]

  return (
    <div className="grid grid-cols-4 gap-2">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
            selected === t.id
              ? 'border-[#00ade8] bg-[#00ade8]/10'
              : 'border-slate-700 bg-slate-900 hover:border-slate-600'
          }`}
        >
          <div className="text-2xl mb-1 text-slate-300">{t.icon}</div>
          <div className={`text-xs font-medium ${selected === t.id ? 'text-[#00ade8]' : 'text-slate-400'}`}>
            {t.name}
          </div>
          {selected === t.id && (
            <div className="mt-1">
              <Check className="w-3 h-3 text-[#00ade8] mx-auto" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

// Confetti effect component
const Confetti = ({ show }: { show: boolean }) => {
  if (!show) return null
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        >
          <div
            style={{
              width: `${5 + Math.random() * 5}px`,
              height: `${5 + Math.random() * 5}px`,
              backgroundColor: ['#00ade8', '#008bb8', '#4dc2ff', '#fff'][Math.floor(Math.random() * 4)],
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default function SignatureGenerator() {
  // State
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    sobrenome: '',
    area: '',
    email: '',
    telefone: '',
    linkedin: '',
    whatsapp: '',
  })
  const [template, setTemplate] = useState<TemplateType>('classic')
  const [theme, setTheme] = useState<ThemeType>('branco')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop')
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedHistorySignature, setSelectedHistorySignature] = useState<SavedSignature | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [copyAnimation, setCopyAnimation] = useState(false)
  const [savedSignatures, setSavedSignatures] = useState<SavedSignature[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const { user, signInWithGoogle, signOut } = useAuth()
  const signatureRef = useRef<HTMLDivElement>(null)
  const hasGeneratedFirstSignature = useRef(false)

  // Auto-fill from Google Auth
  useEffect(() => {
    if (user && !formData.nome && !formData.sobrenome) {
      const nameParts = user.displayName?.split(' ') || []
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''
      
      setFormData(prev => ({
        ...prev,
        nome: firstName,
        sobrenome: lastName,
        email: user.email?.endsWith('@ness.com.br') ? user.email : prev.email
      }))
      
      if (user.email) {
        validateEmail(user.email)
      }
      
      toast.success('Dados preenchidos via Google!')
    }
  }, [user])

  // Calculate progress
  const progress = useCallback(() => {
    const fields = [formData.nome, formData.sobrenome, formData.area, formData.email, formData.telefone]
    const filled = fields.filter(f => f && f.trim() !== '').length
    return Math.round((filled / fields.length) * 100)
  }, [formData])

  // Helper functions
  const capitalize = (str: string) => {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
  }

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailValid(null)
      return
    }
    const isValid = email.toLowerCase().endsWith('@ness.com.br')
    setEmailValid(isValid)
  }

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value })
    validateEmail(value)
  }

  const handleAreaChange = (value: string) => {
    setFormData({ ...formData, area: value })
    // Set recommended template
    const area = AREAS.find(a => a.value === value)
    if (area) {
      setTemplate(area.template)
    }
  }

  const handlePhoneChange = (value: string) => {
    let cleaned = value.replace(/\D/g, '')
    if (cleaned.length > 2) {
      cleaned = cleaned.substring(0, 2) + ' ' + cleaned.substring(2)
    }
    if (cleaned.length > 8) {
      cleaned = cleaned.substring(0, 8) + '-' + cleaned.substring(8, 12)
    }
    setFormData({ ...formData, telefone: cleaned })
  }

  const handleWhatsAppChange = (value: string) => {
    let cleaned = value.replace(/\D/g, '')
    if (cleaned.length > 2) {
      cleaned = cleaned.substring(0, 2) + ' ' + cleaned.substring(2)
    }
    if (cleaned.length > 8) {
      cleaned = cleaned.substring(0, 8) + '-' + cleaned.substring(8, 12)
    }
    setFormData({ ...formData, whatsapp: cleaned })
  }

  const getThemeStyles = useCallback(() => {
    switch (theme) {
      case 'azul':
        return {
          bg: 'bg-slate-900',
          logoColor: '#fff',
          nameColor: '#fff',
          areaColor: '#cbd5e1',
          textColor: '#e2e8f0',
          borderColor: '#00ade8',
        }
      case 'dark':
        return {
          bg: 'bg-slate-900',
          logoColor: '#fff',
          nameColor: '#f1f5f9',
          areaColor: '#94a3b8',
          textColor: '#cbd5e1',
          borderColor: '#334155',
        }
      default:
        return {
          bg: 'bg-white',
          logoColor: '#0f172a',
          nameColor: '#0f172a',
          areaColor: '#64748b',
          textColor: '#334155',
          borderColor: '#00ade8',
        }
    }
  }, [theme])

  const selectedArea = AREAS.find((a) => a.value === formData.area)
  const themeStyles = getThemeStyles()
  const isFormValid = formData.nome && formData.sobrenome && formData.area && formData.email

  // Generate vCard for QR Code
  const generateVCard = useCallback(() => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${formData.sobrenome};${formData.nome};;;
FN:${formData.nome} ${formData.sobrenome}
ORG:NESS
TITLE:${selectedArea?.label || ''}
TEL;TYPE=WORK,VOICE:+55 11 2504-7650
TEL;TYPE=CELL,VOICE:+55 ${formData.telefone}
EMAIL:${formData.email}
URL:https://www.ness.com.br
END:VCARD`
    return vcard
  }, [formData, selectedArea])

  // Copy signature to clipboard
  const copySignature = useCallback(async () => {
    if (signatureRef.current) {
      try {
        const range = document.createRange()
        range.selectNode(signatureRef.current)
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)
        document.execCommand('copy')
        window.getSelection()?.removeAllRanges()
        
        setCopyAnimation(true)
        setTimeout(() => setCopyAnimation(false), 1000)
        
        toast.success('Assinatura copiada!', {
          description: 'Cole no seu cliente de email'
        })
      } catch {
        toast.error('Erro ao copiar assinatura')
      }
    }
  }, [])

  // Export as image
  const exportAsImage = useCallback(async (format: 'png' | 'jpeg') => {
    if (signatureRef.current) {
      try {
        const dataUrl = format === 'png'
          ? await toPng(signatureRef.current, { quality: 1, pixelRatio: 2 })
          : await toJpeg(signatureRef.current, { quality: 0.95, pixelRatio: 2 })

        const link = document.createElement('a')
        link.download = `assinatura-${formData.nome}-${formData.sobrenome}.${format}`
        link.href = dataUrl
        link.click()
        toast.success(`Imagem ${format.toUpperCase()} baixada!`)
      } catch {
        toast.error('Erro ao exportar imagem')
      }
    }
  }, [formData.nome, formData.sobrenome])

  // Save signature with versioning
  const saveSignature = useCallback(() => {
    const existingIndex = savedSignatures.findIndex(
      s => s.data.nome === formData.nome && s.data.sobrenome === formData.sobrenome
    )

    if (existingIndex >= 0) {
      // Update existing with new version
      const existing = savedSignatures[existingIndex]
      const newVersion: SignatureVersion = {
        data: { ...formData },
        template,
        theme,
        savedAt: new Date().toISOString(),
      }
      
      const updated: SavedSignature = {
        ...existing,
        data: formData,
        template,
        theme,
        version: existing.version + 1,
        versions: [...existing.versions, newVersion].slice(-10),
        updatedAt: new Date().toISOString(),
      }
      
      const newList = [...savedSignatures]
      newList[existingIndex] = updated
      setSavedSignatures(newList)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList))
      toast.success('Versão salva!', { description: `Versão ${updated.version}` })
    } else {
      // Create new signature
      const newSignature: SavedSignature = {
        id: Date.now().toString(),
        name: `${formData.nome} ${formData.sobrenome}`,
        data: formData,
        template,
        theme,
        version: 1,
        versions: [{
          data: { ...formData },
          template,
          theme,
          savedAt: new Date().toISOString(),
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const updated = [...savedSignatures, newSignature]
      setSavedSignatures(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      
      if (!hasGeneratedFirstSignature.current) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
        hasGeneratedFirstSignature.current = true
      }
      
      toast.success('Assinatura salva!')
    }
  }, [formData, template, theme, savedSignatures])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault()
            if (isFormValid) saveSignature()
            break
          case 'c':
            if (e.shiftKey) {
              e.preventDefault()
              if (isFormValid) copySignature()
            }
            break
          case 'e':
            e.preventDefault()
            if (isFormValid) exportAsImage('png')
            break
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFormValid, saveSignature, copySignature, exportAsImage])

  // Generate QR Code
  const generateQRCode = async () => {
    try {
      const vcard = generateVCard()
      const url = await QRCode.toDataURL(vcard, {
        width: 300,
        margin: 2,
        color: { dark: '#0f172a', light: '#ffffff' },
      })
      setQrCodeUrl(url)
      setShowQRModal(true)
    } catch {
      toast.error('Erro ao gerar QR Code')
    }
  }

  // Share signature via cloud link
  const shareSignature = async () => {
    try {
      const res = await fetch('/api/signatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          template,
          theme,
        }),
      })
      const data = await res.json()
      if (data.shareUrl) {
        const fullUrl = `${window.location.origin}${data.shareUrl}`
        setShareUrl(fullUrl)
        setShowShareModal(true)
      }
    } catch {
      toast.error('Erro ao criar link de compartilhamento')
    }
  }

  // Load saved signature
  const loadSignature = (saved: SavedSignature) => {
    setFormData(saved.data)
    setTemplate(saved.template as TemplateType)
    setTheme(saved.theme as ThemeType)
    setShowSavedModal(false)
    toast.success('Assinatura carregada!')
  }

  // Load specific version
  const loadVersion = (version: SignatureVersion) => {
    setFormData(version.data)
    setTemplate(version.template as TemplateType)
    setTheme(version.theme as ThemeType)
    setShowHistoryModal(false)
    toast.success('Versão carregada!')
  }

  // Delete saved signature
  const deleteSignature = (id: string) => {
    const updated = savedSignatures.filter((s) => s.id !== id)
    setSavedSignatures(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    toast.success('Assinatura removida!')
  }

  // Render signature templates
  const renderSignature = () => {
    const commonStyles = {
      fontFamily: "'Montserrat', Arial, sans-serif",
    }

    // Template: Classic
    if (template === 'classic') {
      return (
        <table cellPadding={0} cellSpacing={0} style={{ ...commonStyles, width: '450px', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ width: '160px', verticalAlign: 'middle', textAlign: 'center', borderRight: `2px solid ${themeStyles.borderColor}`, paddingRight: '20px' }}>
                <div style={{ fontSize: '42px', fontWeight: 500, color: themeStyles.logoColor }}>
                  ness<span style={{ color: '#00ade8' }}>.</span>
                </div>
              </td>
              <td style={{ paddingLeft: '20px', verticalAlign: 'middle' }}>
                <div style={{ fontSize: '17px', fontWeight: 600, marginBottom: '2px' }}>
                  <span style={{ color: themeStyles.nameColor }}>{capitalize(formData.nome)}</span>{' '}
                  <span style={{ color: '#00ade8' }}>{capitalize(formData.sobrenome)}</span>
                </div>
                <div style={{ fontSize: '9px', color: themeStyles.areaColor, textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
                  {selectedArea?.label || 'Sua área'}
                </div>
                <table cellPadding={0} cellSpacing={0} style={{ fontSize: '11px' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                        <img src="https://img.icons8.com/ios/30/00ade8/phone.png" width={12} height={12} style={{ display: 'block' }} alt="Phone" />
                      </td>
                      <td style={{ paddingBottom: '4px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                        +55 (11) 2504-7650
                      </td>
                    </tr>
                    {formData.telefone && (
                      <tr>
                        <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                          <img src="https://img.icons8.com/ios/30/00ade8/iphone.png" width={12} height={12} style={{ display: 'block' }} alt="Mobile" />
                        </td>
                        <td style={{ paddingBottom: '4px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                          +55 {formData.telefone}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                        <img src="https://img.icons8.com/ios/30/00ade8/new-post.png" width={12} height={12} style={{ display: 'block' }} alt="Email" />
                      </td>
                      <td style={{ paddingBottom: '4px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                        {formData.email || 'seuemail@ness.com.br'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                        <img src="https://img.icons8.com/ios/30/00ade8/domain.png" width={12} height={12} style={{ display: 'block' }} alt="Website" />
                      </td>
                      <td style={{ paddingBottom: '4px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                        <a href="https://www.ness.com.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>ness.com.br</a>
                      </td>
                    </tr>
                    {formData.linkedin && (
                      <tr>
                        <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                          <img src="https://img.icons8.com/ios/30/00ade8/linkedin.png" width={12} height={12} style={{ display: 'block' }} alt="LinkedIn" />
                        </td>
                        <td style={{ paddingBottom: '4px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                          <a href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://linkedin.com/in/${formData.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>LinkedIn</a>
                        </td>
                      </tr>
                    )}
                    {formData.whatsapp && (
                      <tr>
                        <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                          <img src="https://img.icons8.com/ios/30/00ade8/whatsapp.png" width={12} height={12} style={{ display: 'block' }} alt="WhatsApp" />
                        </td>
                        <td style={{ color: themeStyles.textColor, verticalAlign: 'middle' }}>
                          <a href={`https://wa.me/55${formData.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>WhatsApp</a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    // Template: Modern
    if (template === 'modern') {
      return (
        <table cellPadding={0} cellSpacing={0} style={{ ...commonStyles, width: '500px', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ paddingBottom: '15px' }}>
                <div style={{ fontSize: '38px', fontWeight: 500, color: themeStyles.logoColor }}>
                  ness<span style={{ color: '#00ade8' }}>.</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ borderTop: '3px solid #00ade8', paddingTop: '15px' }}>
                <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '2px' }}>
                  <span style={{ color: themeStyles.nameColor }}>{capitalize(formData.nome)}</span>{' '}
                  <span style={{ color: '#00ade8' }}>{capitalize(formData.sobrenome)}</span>
                </div>
                <div style={{ fontSize: '10px', color: themeStyles.areaColor, textTransform: 'uppercase', fontWeight: 600, marginBottom: '15px', letterSpacing: '0.5px' }}>
                  {selectedArea?.label || 'Sua área'}
                </div>
                <table cellPadding={0} cellSpacing={0} style={{ fontSize: '12px' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '22px', paddingRight: '8px', verticalAlign: 'middle' }}>
                        <img src="https://img.icons8.com/ios/30/00ade8/phone.png" width={14} height={14} style={{ display: 'block' }} alt="Phone" />
                      </td>
                      <td style={{ paddingBottom: '6px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                        +55 (11) 2504-7650
                      </td>
                    </tr>
                    {formData.telefone && (
                      <tr>
                        <td style={{ width: '22px', paddingRight: '8px', verticalAlign: 'middle' }}>
                          <img src="https://img.icons8.com/ios/30/00ade8/iphone.png" width={14} height={14} style={{ display: 'block' }} alt="Mobile" />
                        </td>
                        <td style={{ paddingBottom: '6px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                          +55 {formData.telefone}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ width: '22px', paddingRight: '8px', verticalAlign: 'middle' }}>
                        <img src="https://img.icons8.com/ios/30/00ade8/new-post.png" width={14} height={14} style={{ display: 'block' }} alt="Email" />
                      </td>
                      <td style={{ paddingBottom: '6px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                        {formData.email || 'seuemail@ness.com.br'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '22px', paddingRight: '8px', verticalAlign: 'middle' }}>
                        <img src="https://img.icons8.com/ios/30/00ade8/domain.png" width={14} height={14} style={{ display: 'block' }} alt="Website" />
                      </td>
                      <td style={{ paddingBottom: '6px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                        <a href="https://www.ness.com.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>ness.com.br</a>
                      </td>
                    </tr>
                    {(formData.linkedin || formData.whatsapp) && (
                      <tr>
                        <td colSpan={2} style={{ paddingTop: '10px' }}>
                          {formData.linkedin && (
                            <a href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://linkedin.com/in/${formData.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', display: 'inline-block' }}>
                              <img src="https://img.icons8.com/ios/30/00ade8/linkedin.png" width={20} height={20} alt="LinkedIn" />
                            </a>
                          )}
                          {formData.whatsapp && (
                            <a href={`https://wa.me/55${formData.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                              <img src="https://img.icons8.com/ios/30/00ade8/whatsapp.png" width={20} height={20} alt="WhatsApp" />
                            </a>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    // Template: Minimal
    if (template === 'minimal') {
      return (
        <table cellPadding={0} cellSpacing={0} style={{ ...commonStyles, width: '400px', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'middle' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '2px' }}>
                  <span style={{ color: themeStyles.nameColor }}>{capitalize(formData.nome)}</span>{' '}
                  <span style={{ color: '#00ade8' }}>{capitalize(formData.sobrenome)}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#00ade8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px' }}>
                  {selectedArea?.label || 'Sua área'}
                </div>
                <table cellPadding={0} cellSpacing={0} style={{ fontSize: '12px' }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: '3px', color: themeStyles.textColor }}>
                        📧 {formData.email || 'seuemail@ness.com.br'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '3px', color: themeStyles.textColor }}>
                        📞 +55 (11) 2504-7650
                      </td>
                    </tr>
                    {formData.telefone && (
                      <tr>
                        <td style={{ paddingBottom: '3px', color: themeStyles.textColor }}>
                          📱 +55 {formData.telefone}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ color: themeStyles.textColor }}>
                        🌐 <a href="https://www.ness.com.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>ness.com.br</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    // Template: Corporate
    return (
      <table cellPadding={0} cellSpacing={0} style={{ ...commonStyles, width: '520px', borderCollapse: 'collapse', backgroundColor: theme === 'branco' ? '#fff' : '#0f172a' }}>
        <tbody>
          <tr>
            <td style={{ padding: '20px', borderLeft: '4px solid #00ade8' }}>
              <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%', verticalAlign: 'middle' }}>
                      <div style={{ fontSize: '36px', fontWeight: 500, color: themeStyles.logoColor, marginBottom: '5px' }}>
                        ness<span style={{ color: '#00ade8' }}>.</span>
                      </div>
                      <div style={{ fontSize: '9px', color: themeStyles.areaColor, textTransform: 'uppercase' }}>
                        Cybersecurity & Tech Solutions
                      </div>
                    </td>
                    <td style={{ width: '50%', verticalAlign: 'middle', textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: themeStyles.nameColor }}>
                        {capitalize(formData.nome)} <span style={{ color: '#00ade8' }}>{capitalize(formData.sobrenome)}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: themeStyles.areaColor, textTransform: 'uppercase', fontWeight: 600 }}>
                        {selectedArea?.label || 'Sua área'}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ height: '1px', backgroundColor: themeStyles.borderColor, margin: '15px 0' }}></div>
              <table cellPadding={0} cellSpacing={0} style={{ fontSize: '11px', width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                      <img src="https://img.icons8.com/ios/30/00ade8/phone.png" width={12} height={12} style={{ display: 'block' }} alt="Phone" />
                    </td>
                    <td style={{ paddingBottom: '5px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                      +55 (11) 2504-7650
                    </td>
                    {formData.telefone && (
                      <>
                        <td style={{ width: '18px', paddingLeft: '15px', paddingRight: '6px', verticalAlign: 'middle' }}>
                          <img src="https://img.icons8.com/ios/30/00ade8/iphone.png" width={12} height={12} style={{ display: 'block' }} alt="Mobile" />
                        </td>
                        <td style={{ paddingBottom: '5px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                          +55 {formData.telefone}
                        </td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td style={{ width: '18px', paddingRight: '6px', verticalAlign: 'middle' }}>
                      <img src="https://img.icons8.com/ios/30/00ade8/new-post.png" width={12} height={12} style={{ display: 'block' }} alt="Email" />
                    </td>
                    <td style={{ paddingBottom: '5px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                      {formData.email || 'seuemail@ness.com.br'}
                    </td>
                    <td style={{ width: '18px', paddingLeft: '15px', paddingRight: '6px', verticalAlign: 'middle' }}>
                      <img src="https://img.icons8.com/ios/30/00ade8/domain.png" width={12} height={12} style={{ display: 'block' }} alt="Website" />
                    </td>
                    <td style={{ paddingBottom: '5px', color: themeStyles.textColor, verticalAlign: 'middle' }}>
                      <a href="https://www.ness.com.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>ness.com.br</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 font-montserrat flex flex-col">
      <Toaster position="top-right" />
      <Confetti show={showConfetti} />

      {/* Header */}
      <header className="border-b border-slate-700 py-4 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-medium text-slate-100 tracking-tight">
              n<span className="text-[#00ade8]">.</span>sign
            </h1>
            <span className="text-slate-400 text-sm font-normal hidden sm:block">v2.1</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSavedModal(true)}
              className="text-[#00ade8] hover:bg-[#00ade8]/10"
            >
              <Save className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Salvas</span> ({savedSignatures.length})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHelpModal(true)}
              className="text-[#00ade8] hover:bg-[#00ade8]/10"
            >
              <HelpCircle className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Ajuda</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 text-lg font-medium flex items-center gap-2">
                  <Layout className="w-5 h-5 text-[#00ade8]" />
                  Dados da Assinatura
                </CardTitle>
                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00ade8] transition-all duration-300 rounded-full"
                      style={{ width: `${progress()}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{progress()}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              {/* Google Auth Integration */}
              {!user ? (
                <div className="space-y-3">
                  <Button 
                    onClick={signInWithGoogle}
                    variant="outline"
                    className="w-full h-11 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center justify-center gap-3 transition-all duration-200"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Preencher com Google
                  </Button>
                  <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-medium">
                    Acesso exclusivo @ness.com.br
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    {user.photoURL && (
                      <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-[#00ade8]/50" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400">Logado como:</span>
                      <span className="text-sm font-medium text-slate-200 truncate max-w-[150px]">{user.displayName}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={signOut}
                    className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 h-8"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sair
                  </Button>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-500">Dados Manuais</span>
                </div>
              </div>
              {/* Nome e Sobrenome */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm font-normal">Nome:</Label>
                  <Input
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Primeiro nome"
                    className="h-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#00ade8]/50 focus:border-[#00ade8] rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm font-normal">Sobrenome:</Label>
                  <Input
                    value={formData.sobrenome}
                    onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                    placeholder="Sobrenome"
                    className="h-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#00ade8]/50 focus:border-[#00ade8] rounded-lg"
                  />
                </div>
              </div>

              {/* Área */}
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm font-normal">Área:</Label>
                <Select value={formData.area} onValueChange={handleAreaChange}>
                  <SelectTrigger className="h-11 bg-slate-900 border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-[#00ade8]/50">
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 max-h-64">
                    {AREAS.map((area) => (
                      <SelectItem key={area.value} value={area.value} className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedArea && (
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#00ade8]" />
                    Template recomendado: {selectedArea.template}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm font-normal">E-mail Ness:</Label>
                <div className="relative">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="usuario@ness.com.br"
                    className={`h-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#00ade8]/50 focus:border-[#00ade8] rounded-lg pr-10 ${
                      emailValid === false ? 'border-red-500' : emailValid === true ? 'border-green-500' : ''
                    }`}
                  />
                  {emailValid !== null && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {emailValid ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {emailValid === false && (
                  <p className="text-xs text-red-400">Use seu email corporativo @ness.com.br</p>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm font-normal">Celular:</Label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg h-11 px-3 w-20 justify-center flex-shrink-0">
                    <img src="https://flagcdn.com/w40/br.png" alt="Brasil" className="w-5 h-auto rounded" />
                    <span className="text-white text-sm font-medium">+55</span>
                  </div>
                  <Input
                    value={formData.telefone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="11 99999-9999"
                    maxLength={13}
                    className="h-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#00ade8]/50 focus:border-[#00ade8] rounded-lg flex-1"
                  />
                </div>
              </div>

              {/* Social Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm font-normal flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#00ade8]" /> LinkedIn:
                  </Label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="seu-perfil ou URL"
                    className="h-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#00ade8]/50 focus:border-[#00ade8] rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm font-normal flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#00ade8]" /> WhatsApp:
                  </Label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => handleWhatsAppChange(e.target.value)}
                    placeholder="11 99999-9999"
                    maxLength={13}
                    className="h-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#00ade8]/50 focus:border-[#00ade8] rounded-lg"
                  />
                </div>
              </div>

              {/* Keyboard Shortcuts Info */}
              <div className="pt-2 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Atalhos: <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">Ctrl+S</kbd> salvar ·{' '}
                  <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">Ctrl+Shift+C</kbd> copiar ·{' '}
                  <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">Ctrl+E</kbd> exportar
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700 pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-slate-100 text-lg font-medium flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#00ade8]" />
                  Pré-visualização
                </CardTitle>
                <div className="flex items-center gap-2">
                  {/* Preview Mode Toggle */}
                  <div className="flex bg-slate-900 rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-1.5 rounded transition-all ${previewMode === 'desktop' ? 'bg-[#00ade8] text-white' : 'text-slate-400 hover:text-white'}`}
                      title="Desktop"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-1.5 rounded transition-all ${previewMode === 'mobile' ? 'bg-[#00ade8] text-white' : 'text-slate-400 hover:text-white'}`}
                      title="Mobile"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                  <Select value={theme} onValueChange={(v) => setTheme(v as ThemeType)}>
                    <SelectTrigger className="w-24 h-8 bg-slate-900 border-slate-700 text-slate-300 text-xs rounded-lg focus:ring-[#00ade8]/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="branco" className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">Branco</SelectItem>
                      <SelectItem value="azul" className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">Azul</SelectItem>
                      <SelectItem value="dark" className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Template Selector */}
              <div className="pt-4">
                <Label className="text-slate-400 text-xs font-normal mb-2 block">Template:</Label>
                <TemplateThumbnails selected={template} onSelect={setTemplate} />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Signature Preview */}
              <div className={`rounded-xl p-6 mb-6 transition-all duration-300 overflow-auto ${themeStyles.bg} ${
                copyAnimation ? 'ring-2 ring-[#00ade8] ring-offset-2 ring-offset-slate-800' : ''
              }`}
              style={{
                maxWidth: previewMode === 'mobile' ? '375px' : '100%',
                margin: previewMode === 'mobile' ? '0 auto' : '0'
              }}
              >
                <div ref={signatureRef}>
                  {renderSignature()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                <Button
                  onClick={copySignature}
                  disabled={!isFormValid}
                  className={`h-11 bg-[#00ade8] hover:bg-[#008bb8] text-white font-medium text-xs rounded-lg disabled:opacity-50 transition-all duration-200 active:scale-[0.98] ${
                    copyAnimation ? 'bg-green-500 hover:bg-green-500' : ''
                  }`}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copyAnimation ? 'Copiado!' : 'Copiar HTML'}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      disabled={!isFormValid}
                      className="h-11 bg-[#00ade8] hover:bg-[#008bb8] text-white font-medium text-xs rounded-lg disabled:opacity-50 transition-all duration-200 active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-900 border-slate-700">
                    <DropdownMenuItem onClick={() => exportAsImage('png')} className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">
                      Baixar PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportAsImage('jpeg')} className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">
                      Baixar JPEG
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  onClick={generateQRCode}
                  disabled={!isFormValid}
                  variant="outline"
                  className="h-11 border-2 border-[#00ade8] text-[#00ade8] hover:bg-[#00ade8] hover:text-white font-medium text-xs rounded-lg disabled:opacity-50 transition-all duration-200 active:scale-[0.98]"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
                <Button
                  onClick={saveSignature}
                  disabled={!isFormValid}
                  variant="outline"
                  className="h-11 border-2 border-[#00ade8] text-[#00ade8] hover:bg-[#00ade8] hover:text-white font-medium text-xs rounded-lg disabled:opacity-50 transition-all duration-200 active:scale-[0.98]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  onClick={shareSignature}
                  disabled={!isFormValid}
                  variant="outline"
                  className="h-11 col-span-2 border-2 border-[#00ade8] text-[#00ade8] hover:bg-[#00ade8] hover:text-white font-medium text-xs rounded-lg disabled:opacity-50 transition-all duration-200 active:scale-[0.98]"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-4 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <a href="https://www.ness.com.br" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 text-xs">
            n.sign © 2026 NESS. Todos os direitos reservados.
          </a>
        </div>
      </footer>

      {/* Help Modal */}
      <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-300 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#00ade8] text-xl font-medium">Como Usar sua Assinatura</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p className="font-medium text-slate-100">📧 Aplicar no Gmail:</p>
            <ol className="list-decimal list-inside space-y-2 leading-relaxed">
              <li>Acesse seu <strong className="text-slate-100">Gmail</strong></li>
              <li>Clique em <strong className="text-slate-100">Configurações ⚙</strong> → <strong className="text-slate-100">&quot;Ver todas as configurações&quot;</strong></li>
              <li>Role até <strong className="text-slate-100">&quot;Assinatura&quot;</strong> e cole na caixa de texto</li>
              <li>Verifique se os links estão ativos</li>
              <li>Clique em <strong className="text-slate-100">&quot;Salvar alterações&quot;</strong></li>
            </ol>

            <p className="font-medium text-slate-100 mt-4">✨ Novidades v2.1:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
              <li>Seletor visual de templates</li>
              <li>Barra de progresso de preenchimento</li>
              <li>Validação de email corporativo</li>
              <li>Preview responsivo (mobile/desktop)</li>
              <li>Atalhos de teclado</li>
              <li>Histórico de versões</li>
              <li>Template recomendado por área</li>
              <li>Animações e feedback visual</li>
            </ul>

            <p className="font-medium text-slate-100 mt-4">⌨️ Atalhos de Teclado:</p>
            <ul className="text-xs text-slate-400 space-y-1">
              <li><kbd className="px-1 py-0.5 bg-slate-700 rounded">Ctrl+S</kbd> - Salvar assinatura</li>
              <li><kbd className="px-1 py-0.5 bg-slate-700 rounded">Ctrl+Shift+C</kbd> - Copiar assinatura</li>
              <li><kbd className="px-1 py-0.5 bg-slate-700 rounded">Ctrl+E</kbd> - Exportar como PNG</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-300 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#00ade8] text-xl font-medium flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code vCard
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-xl">
              {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />}
            </div>
            <p className="text-slate-400 text-sm text-center">
              Escaneie para adicionar contato diretamente no celular
            </p>
            {qrCodeUrl && (
              <Button
                onClick={() => {
                  const link = document.createElement('a')
                  link.download = `qrcode-${formData.nome}-${formData.sobrenome}.png`
                  link.href = qrCodeUrl
                  link.click()
                  toast.success('QR Code baixado!')
                }}
                className="w-full bg-[#00ade8] hover:bg-[#008bb8] text-white font-medium rounded-lg transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar QR Code
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Saved Signatures Modal */}
      <Dialog open={showSavedModal} onOpenChange={setShowSavedModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-300 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#00ade8] text-xl font-medium flex items-center gap-2">
              <Save className="w-5 h-5" />
              Assinaturas Salvas
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {savedSignatures.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">
                Nenhuma assinatura salva ainda.
              </p>
            ) : (
              savedSignatures.map((sig) => (
                <div
                  key={sig.id}
                  className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 hover:border-[#00ade8]/30 hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex-1">
                    <div className="text-slate-100 font-medium">{sig.name}</div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <span>v{sig.version}</span>
                      <span>•</span>
                      <span>{new Date(sig.updatedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {sig.version > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedHistorySignature(sig)
                          setShowHistoryModal(true)
                        }}
                        className="text-slate-400 hover:text-[#00ade8] h-8"
                        title="Ver histórico"
                      >
                        <History className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => loadSignature(sig)}
                      className="text-[#00ade8] hover:bg-[#00ade8]/10 h-8"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteSignature(sig.id)}
                      className="text-red-400 hover:bg-red-400/10 h-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Version History Modal */}
      <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-300 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#00ade8] text-xl font-medium flex items-center gap-2">
              <History className="w-5 h-5" />
              Histórico de Versões
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedHistorySignature?.versions.map((version, index) => (
              <div
                key={index}
                className="p-3 bg-slate-900 rounded-lg border border-slate-700 hover:border-[#00ade8]/30 transition-colors cursor-pointer"
                onClick={() => loadVersion(version)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-100 font-medium">Versão {index + 1}</div>
                    <div className="text-slate-500 text-xs">
                      {new Date(version.savedAt).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-slate-400 text-xs mt-1">
                      Template: {version.template} • Tema: {version.theme}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[#00ade8] hover:bg-[#00ade8]/10"
                  >
                    Restaurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-300 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#00ade8] text-xl font-medium flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Link de Compartilhamento
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">
              Compartilhe este link para que outros possam ver sua assinatura:
            </p>
            <div className="flex gap-2">
              <Input
                value={shareUrl || ''}
                readOnly
                className="bg-slate-900 border-slate-700 text-slate-300 text-sm"
              />
              <Button
                onClick={() => {
                  if (shareUrl) {
                    navigator.clipboard.writeText(shareUrl)
                    toast.success('Link copiado!')
                  }
                }}
                className="bg-[#00ade8] hover:bg-[#008bb8] text-white px-4"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-slate-500 text-xs">
              O link pode ser acessado publicamente e contará as visualizações.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
