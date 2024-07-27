import { ReactNode } from 'react';

interface CardIconProps {
  src: string;
}

interface TitleProps {
  title: string;
  textColor?: string;
}

interface StepLabelProps {
  step: string;
  bgColor?: string;
  textColor?: string;
}

interface DescriptionProps {
  children: ReactNode;
}

interface StepCardProps {
  iconSrc: string;
  title: string;
  titleColor?: string;
  step: string;
  description: string;
  stepBgColor?: string;
  stepTextColor?: string;
}

const CardIcon = ({ src }: CardIconProps) => (
  <div
    className='h-6 w-6 flex-shrink-0 rounded-full bg-transparent bg-cover bg-center bg-no-repeat'
    style={{ backgroundImage: `url(${src})` }}
  />
);

const Title = ({ title, textColor = '#272330' }: TitleProps) => (
  <p
    className='max-w-[70%] truncate font-poppins text-base font-medium leading-7'
    style={{ color: textColor }}
  >
    {title}
  </p>
);

const StepLabel = ({
  step,
  bgColor = '#FFFAF2',
  textColor = '#272330',
}: StepLabelProps) => (
  <span
    className='flex items-center justify-center rounded px-2.5 py-0.5 text-sm'
    style={{ backgroundColor: bgColor, color: textColor }}
  >
    {step}
  </span>
);

const Description = ({ children }: DescriptionProps) => (
  <p className='text-muted-foreground mt-2 font-poppins text-sm leading-6'>
    {children}
  </p>
);

const StepCard = ({
  iconSrc,
  title,
  titleColor,
  step,
  description,
  stepBgColor,
  stepTextColor,
}: StepCardProps) => (
  <div className='my-[10px] rounded-[10px] bg-white p-4'>
    <div className='mb-2 flex w-full items-start justify-between'>
      <div className='flex flex-grow items-center'>
        <CardIcon src={iconSrc} />
        <div className='ml-4 flex flex-grow items-center justify-between'>
          <Title title={title} textColor={titleColor} />
          <StepLabel
            step={step}
            bgColor={stepBgColor}
            textColor={stepTextColor}
          />
        </div>
      </div>
    </div>
    <Description>{description}</Description>
  </div>
);

export default StepCard;
