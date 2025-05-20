import React from "react";

interface Section {
  title: string;
  content: string;
}

interface Props {
  title: string;
  sections: Section[];
}

const CardSection: React.FC<Props> = ({ title, sections }) => {
  return (
    <div className='flex flex-col w-full p-4 bg-white rounded-lg md:p-8 gap-4'>
      <p className='text-xl font-bold mb-4'>{title}</p>
      {sections.map((section, index) => (
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
