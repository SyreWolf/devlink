//This constant stores the styles of all the elements of the Task Component
export const TaskStyles = {
  wrapper: 'relative bg-[#404145] rounded-md w-full mb-3 animate__animated animate__bounce animate__fadeIn delay-4',
  card_wrapper: 'flex items-start flex-col gap-y-1 relative cursor-pointer py-3 px-5 z-10 shadow-sm',
  title: 'font-normal text-sm text-justify tracking-wider mt-1 text-[#ededf2]',
  description: 'font-light text-xs text-justify tracking-wider my-2 text-[#ededf2]',
  text: 'font-light text-xs my-2 text-[#ededf2]',
  big_icon: 'text-sm my-2 text-[#ededf2]',
  clock: 'mt-[-0.1rem]',
  date: 'flex flex-row justify-center items-center gap-x-2 font-light text-xs my-1 py-1.5 pl-2 pr-2.5 text-[#ededf2] transition-colors rounded-md z-20 cursor-pointer',
  date_finished: 'bg-[#34a853] hover:bg-[#34a853]/20',
  date_out_of_time: 'bg-[#ea4235] hover:bg-[#ea4235]/20',
  date_in_progress: 'bg-[#313237] hover:bg-[#ffffff]/20',
  requirements: 'flex flex-row justify-center items-center gap-x-2 font-light text-xs text-[#ededf2]',
  members: 'flex flex-row justify-center items-center ml-[1rem]',
  member: 'h-10 w-10 bg-[#313237] border-2 border-[#404145] ml-[-1rem] rounded-full flex justify-center items-center z-20',
  extra_member_text: 'text-[#7d7d80] font-medium text-xs ml-2',
  member_image: 'rounded-full',
  tags_wrapper: 'flex flex-row justify-start items-center mt-2 gap-x-2.5 w-full',
  tag: 'h-2 w-10 rounded-full'
};