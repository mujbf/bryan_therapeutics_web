'use client'

import { useState, useEffect, useRef } from 'react'
import Text from './TextComponent'
import Button from './Button'
import RichText from '@/components/RichText'
import Image from 'next/image'

type Field = {
  id: string
  name: string
  label: string
  blockType: string
}

type CmsForm = {
  confirmationMessage?: any
  fields?: Field[]
}

const ContactForm = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<CmsForm | null>(null)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    fetch(`api/forms/${formId}`)
      .then((res) => res.json())
      .then((data: CmsForm) => {
        setCmsForm(data)
        console.log('cmsForm', data)
      })
      .catch((err) => {
        setError('Error loading form')
        console.error(err)
      })
  }, [formId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log('formData', Object.fromEntries(formData))

    const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
      field: name,
      value: value.toString(),
    }))

    const response = await fetch('/api/form-submissions', {
      method: 'POST',
      body: JSON.stringify({
        form: formId,
        submissionData: dataToSend,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      setSuccess(true)
      formRef.current?.reset()
      setTimeout(() => setSuccess(false), 5000)
    } else {
      setError('Form submission failed')
      setSuccess(false)
    }
  }

  if (!cmsForm) return <div>Loading...</div>

  return (
    <div className="h-auto md:h-[85vh] w-screen bg-[#FFFFFF] flex flex-col justify-center">
      <div className="container max-w-7xl mx-auto px-4 pb-8 md:pb-16 lg:pb-20 flex flex-col gap-6 md:gap-12 lg:gap-16">
        <Text variant="h2" color="text-[#2E4EA1]" className="text-2xl sm:text-3xl md:text-4xl">
          Contact Us
        </Text>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 ">
          {/* Contact Form - Left Side */}
          <div className="w-full lg:w-3/5">
            {success && cmsForm.confirmationMessage && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                <RichText data={cmsForm.confirmationMessage} className="text-green-700" />
              </div>
            )}

            <form onSubmit={handleSubmit} ref={formRef}>
              {cmsForm.fields?.map((field) => (
                <div key={field.id}>
                  <input
                    type={field.blockType}
                    name={field.name}
                    id={field.name}
                    placeholder={field.label}
                    className="w-full p-2 md:p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E4EA1] transition-all mb-4 md:mb-8"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              ))}

              <Button
                variant="button3"
                bgColor="bg-[#E00047]"
                color="text-white"
                className="w-fit hover:bg-[#FF3D7A]"
                onClick={(_e) => {
                  formRef.current?.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true }),
                  )
                }}
              >
                Submit Form
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <Text variant="body3" color="text-red-600">
                  {error}
                </Text>
              </div>
            )}
          </div>

          {/* Contact Information - Right Side */}
          <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
            <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
              {/* Phone */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="px-2 py-1 rounded-full flex-shrink-0">
                  <Image src="/icons/phone-icon.svg" alt="Phone" width={24} height={24} />
                </div>
                <Text
                  variant="body3"
                  color="text-[#535353]"
                  className="text-base md:text-lg break-words"
                >
                  +1 (555) 123-4567
                </Text>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="px-2 py-1 rounded-full flex-shrink-0">
                  <Image src="/icons/email-icon.svg" alt="Email" width={24} height={24} />
                </div>
                <Text
                  variant="body3"
                  color="text-[#535353]"
                  className="text-base md:text-lg break-words"
                >
                  contact@company.com
                </Text>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="px-2 rounded-full flex-shrink-0 ">
                  <Image src="/icons/location-icon.svg" alt="Address" width={16} height={16} />
                </div>
                <Text
                  variant="body3"
                  color="text-[#535353]"
                  className="text-base md:text-lg break-words"
                >
                  123 Business Avenue, City, Country
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
