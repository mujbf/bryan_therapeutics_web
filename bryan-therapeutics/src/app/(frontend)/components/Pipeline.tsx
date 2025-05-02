'use client'
import React, { useEffect, useState } from 'react'
import Text from './TextComponent'

// Define TypeScript interface for clinical trial data
interface ClinicalTrialProps {
  id: string
  treatment: string
  trial: string
  histology: string
  combination: string
  region: string
  status: string
}

// Row component for each clinical trial
const ClinicalTrialRow: React.FC<ClinicalTrialProps> = ({
  treatment,
  trial,
  histology,
  combination,
  region,
  status,
}) => {
  return (
    <tr className="border-b-1 border-[#0E215480]">
      <td className="py-4 px-4 md:px-8 md:py-4 align-top">
        <Text variant="body2" color="text-gray-800">
          {treatment}
        </Text>
      </td>
      <td className="py-4 px-4 md:px-8 md:py-4 align-top">
        <Text variant="body2" color="text-gray-800">
          {trial}
        </Text>
      </td>
      <td className="py-4 px-4 md:px-8 md:py-4 align-top">
        <div className="flex flex-col gap-2">
          <Text variant="h4" color="text-gray-800">
            {histology}
          </Text>
          <Text variant="body3" color="text-gray-600">
            {combination}
          </Text>
        </div>
      </td>
      <td className="py-4 px-4 md:px-8 md:py-4 align-top">
        <Text variant="body2" color="text-gray-800">
          {region}
        </Text>
      </td>
      <td className="py-4 px-4 md:px-8 md:py-4 align-top">
        <Text variant="body2" color="text-gray-800">
          {status}
        </Text>
      </td>
    </tr>
  )
}

// Table component to display clinical trials
const ClinicalTrialsTable: React.FC = () => {
  const [trials, setTrials] = useState<ClinicalTrialProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch clinical trials from Payload API
    const fetchTrials = async () => {
      try {
        const response = await fetch('/api/clinical-trials?limit=100')
        if (!response.ok) {
          throw new Error('Failed to fetch clinical trials')
        }
        const data = await response.json()
        setTrials(data.docs)
      } catch (err) {
        console.error('Error fetching clinical trials:', err)
        setError('Failed to load clinical trials data')
      } finally {
        setLoading(false)
      }
    }

    fetchTrials()
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading clinical trials data...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-[#D9EBFF]">
        <thead>
          <tr className="border-b-2 border-[#0E215480]">
            <th className="py-4 px-4 md:px-8 md:py-8 text-left">
              <Text variant="h4" color="text-gray-800">
                Treatment
              </Text>
            </th>
            <th className="py-4 px-4 md:px-8 md:py-8 text-left">
              <Text variant="h4" color="text-gray-800">
                Trial
              </Text>
            </th>
            <th className="py-4 px-4 md:px-8 md:py-8 text-left w-100">
              <Text variant="h4" color="text-gray-800">
                Histology/Population
              </Text>
            </th>
            <th className="py-4 px-4 md:px-8 md:py-8 text-left">
              <Text variant="h4" color="text-gray-800">
                Recruitment Region
              </Text>
            </th>
            <th className="py-4 px-4 md:px-8 md:py-8 text-left">
              <Text variant="h4" color="text-gray-800">
                Status
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {trials.length > 0 ? (
            trials.map((trial) => <ClinicalTrialRow key={trial.id} {...trial} />)
          ) : (
            <tr>
              <td colSpan={5} className="py-8 text-center">
                No clinical trials found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// Main Pipeline component
const Pipeline: React.FC = () => {
  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-16 lg:py-20 flex flex-col gap-6 md:gap-12 lg:gap-16">
        <Text variant="h2" color="text-[#2E4EA1]" align="center">
          Drug Pipeline
        </Text>
        <div className="rounded-lg overflow-hidden shadow-md">
          <ClinicalTrialsTable />
        </div>
      </div>
    </>
  )
}

export default Pipeline
