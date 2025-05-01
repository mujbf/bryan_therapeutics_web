import Image from 'next/image'
import Text from '../components/TextComponent'
import Button from '../components/Button'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Nathan S. Bryan',
      designation: 'Founder, Chairman, and CEO',
      image: '/team/1.webp',
    },
    {
      name: 'Susan Kim Shaffer',
      designation: 'Co-Founder & President',
      image: '/team/2.webp',
    },
    {
      name: 'Alyssa Seidler',
      designation: 'Director of Customer Service',
      image: '/team/3.webp',
    },
    {
      name: 'Jenny Doe',
      designation: 'Director of Finance',
      image: '/team/4.webp',
    },
    {
      name: 'Dr. Nathan S. Bryan',
      designation: 'Founder, Chairman, and CEO',
      image: '/team/1.webp',
    },
    {
      name: 'Susan Kim Shaffer',
      designation: 'Co-Founder & President',
      image: '/team/2.webp',
    },
    {
      name: 'Alyssa Seidler',
      designation: 'Director of Customer Service',
      image: '/team/3.webp',
    },
    {
      name: 'Jenny Doe',
      designation: 'Director of Finance',
      image: '/team/4.webp',
    },
  ]
  return (
    <>
      {/* Mission */}
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-20 flex flex-col gap-6 md:gap-16">
        <div className="flex flex-col gap-4 md:gap-10">
          <Text variant="h2" color="text-[#2E4EA1]" align="center">
            Our Mission
          </Text>
          <Text variant="body2" color="text-[#535353]" align="center">
            Our mission is to transform lives through groundbreaking research and the development of
            drugs that produce and restore nitric oxide in the human body. We believe in a future
            where safe and effective therapies that get to the root cause of disease will eliminate
            human disease and suffering. Our commitment to advancing the understanding of nitric
            oxide&apos;s role in cardiovascular health and chronic diseases is unwavering. With the
            visionary leadership of Dr. Nathan Bryan, we aim to lead the way in nitric oxide
            research and its applications in human therapeutics.
          </Text>
        </div>
        <Image
          src="/images/video-thumbnail.webp"
          alt="Product showcase"
          layout="responsive"
          width={1304}
          height={744}
          className="w-full"
        />
        <div className="flex flex-col gap-4 md:gap-10">
          <Text variant="h3" color="text-[#2E4EA1]" align="center">
            Dr. Nathan Bryan
          </Text>
          <div className="flex flex-col md:flex-row gap-4 md:gap-20">
            <Text variant="body2" color="text-[#535353]">
              Dr. Bryan earned his undergraduate Bachelor of Science degree in Biochemistry from the
              University of Texas at Austin and his doctoral degree from Louisiana State University
              School of Medicine in Shreveport where he was the recipient of the Dean’s Award for
              Excellence in Research. <br />
              <br />
              He pursued his post-doctoral training as a Kirschstein Fellow at Boston University
              School of Medicine in the Whitaker Cardiovascular Institute. After a two year
              post-doctoral fellowship, in 2006 Dr. Bryan was recruited to join faculty at the
              University of Texas Health Science Center at Houston by Ferid Murad, M.D., Ph.D., 1998
              Nobel Laureate in Medicine or Physiology. <br />
              <br />
              Dr. Bryan has been involved in nitric oxide research for the past 20 years and has
              made many seminal discoveries in the field. His many seminal discoveries have resulted
              dozens of issued US and International patents and the product technology resulting
              from his discoveries and inventions has improved patient care worldwide.
            </Text>
            <Text variant="body2" color="text-[#535353]">
              Dr. Bryan is a successful entrepreneur and Founder of HumanN, Inc, Pneuma Nitric
              Oxide, LLC, Nitric Oxide Innovations, LLC, Bryan Nitriceuticals, LLC and Bryan
              Therapeutics, Inc. <br />
              <br />
              His companies and product technology are responsible for more than one billion dollars
              in product sales worldwide. Most recently, Dr. Bryan serves as Founder and CEO of
              Bryan Therapeutics, Inc., a privately-held, clinical-stage biopharmaceutical company
              that is actively engaged in the discovery and development of nitric oxide-based
              therapies. <br />
              <br />
              BTI has active drug development programs in heart disease, Alzheimers’ Disease and
              topical drugs for diabetic ulcer and non-healing wounds. Dr. Bryan is an international
              leader in molecular medicine and nitric oxide biochemistry.
            </Text>
          </div>
          <div className="flex flex-row md:flex-col gap-4 md:gap-20"></div>
        </div>
      </div>

      {/* Team */}
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-20 flex flex-col gap-6 md:gap-20 items-center">
        <Text variant="h2" color="text-[#2E4EA1]" align="center">
          Leadership Team
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 w-full">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              <Image
                src={member.image}
                alt={member.name}
                width={220}
                height={220}
                className="rounded-full object-cover mb-4"
                priority={true}
              />
              <Text variant="h4" color="text-[#6BB0FF]" align="center">
                {member.name}
              </Text>
              <Text variant="body2" color="text-[#535353]" align="center">
                {member.designation}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#D9EBFF]">
        <div className="container max-w-7xl mx-auto px-4 py-8 md:py-40 flex flex-col gap-6 md:gap-10 items-center">
          <Text variant="h3" color="text-[#2E4EA1]" align="center">
            Business development and partnerships
          </Text>

          <Text variant="body2" color="text-[#0E2154]" align="center">
            Get in touch with us using the form on our Contact Us page. <br /> Our business
            development team will reach out to you with a reply.
          </Text>
          <Button
            variant="button3"
            bgColor="bg-[#2E4EA1] text-white"
            className="hover:bg-[#224EC4]"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </>
  )
}
