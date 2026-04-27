'use client'

import dynamic from 'next/dynamic'

const CRMApp = dynamic(() => import('@/components/crm/CRMApp'), { ssr: false })

export default function Home() {
  return <CRMApp />
}
