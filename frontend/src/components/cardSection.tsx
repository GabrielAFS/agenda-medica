import React from "react";

interface Section {
  title: string;
  content: string;
}

interface Props {
  title: string;
  sections: Section[];
  isCollapsable?: boolean;
}

const CardSection: React.FC<Props> = ({
  title,
  sections,
  isCollapsable = false,
}) => {
  const [open, setOpen] = React.useState<boolean>(!isCollapsable);

  return (
    <div className='flex flex-col w-full p-4 bg-white rounded-lg md:p-8 gap-4'>
      <button
        className='w-full text-left text-xl font-bold  bg-transparent transition duration-300'
        onClick={
          isCollapsable ? () => setOpen((prevState) => !prevState) : undefined
        }
      >
        {title}
        {isCollapsable && (
          <span
            className={`float-right transform ${
              open ? "rotate-180" : "rotate-0"
            } transition-transform duration-300`}
          >
            &#9660;
          </span>
        )}
      </button>
      {open &&
        sections.map((section, index) => (
          <>
            <div key={index} className='flex justify-between'>
              <p className='text-lg font-bold'>{section.title}</p>
              <p className='text-lg'>{section.content}</p>
            </div>
            {index < sections.length - 1 && (
              <hr className='border-t-0 border-b-[1px]' />
            )}
          </>
        ))}
    </div>
  );
};

export default CardSection;
