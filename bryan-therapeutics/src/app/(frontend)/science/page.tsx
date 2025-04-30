import Text from '../components/TextComponent'
import Image from 'next/image'

export default function SciencePage() {
  return (
    <>
      {/* Use Cases */}
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-20 flex flex-col gap-6 md:gap-16">
        <div className="flex flex-col gap-4 md:gap-10">
          <Text variant="h2" color="text-[#2E4EA1]" align="center">
            Clinical Use Cases
          </Text>

          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:gap-6 border-b border-[#979797] py-4 md:py-10"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <Image
                  src="/images/use-case.webp"
                  alt="Use Case"
                  width={353}
                  height={415}
                  className=""
                />
                <div className="flex flex-col gap-2 md:gap-4">
                  <Text variant="h4" color="text-[#6BB0FF]">
                    Persistent Pulmonary Hypertension of the Newborn (PPHN)
                  </Text>
                  <Text variant="body2" color="text-[#535353]">
                    Inhaled Nitric Oxide (iNO) is FDA-approved for treating PPHN, a condition
                    characterized by high pulmonary vascular resistance in neonates, leading to
                    hypoxemia. iNO works by dilating pulmonary vessels, improving oxygenation by
                    redistributing blood flow to better-ventilated areas of the lungs
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
