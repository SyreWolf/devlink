//This constant stores the styles of all the elements of the Task Form Component
export const TaskFormStyles = {
  modal: 'z-[5000] py-16 flex flex-wrap flex-row justify-center items-center fixed top-0 left-0 w-screen h-screen bg-[#1A1A1A]/20 backdrop-blur-sm',
  modal_wrapper: 'relative w-3/5 h-fit p-8 flex flex-nowrap flex-col justify-start items-end w-full gap-y-6 border-2 border-[#edecf1] bg-[#313237] backdrop-blur-md drop-shadow-[0_0_2px_#1A1A1A] rounded-md',
  info_block: 'flex flex-nowrap flex-row justify-between items-start w-full gap-x-24',
  info_section_block: 'grid grid-cols-12 grid-flow-row col-span-12 gap-8 w-3/4',
  requirements_block: 'flex flex-wrap flex-col justify-end items-start gap-y-6 col-span-12',
  requirements_wrapper: 'flex flex-nowrap flex-col justify-start items-start gap-y-6 max-h-[200px] overflow-y-auto',
  date_select_wrapper: 'flex flex-nowrap flex-col gap-y-8 w-1/4',
  requirement: 'flex flex-nowrap flex-row justify-start items-start gap-x-4 mr-5 ',
  requirement_text: 'text-xs font-normal break-all text-[#BABABA] pointer-events-none',
  input_text: 'w-full font-medium text-sm text-[#E0E0E0] bg-transparent border-2 border-[#404144] hover:bg-[#ffffff]/10 hover:border-[#edecf1] rounded-md transition-all duration-[0.2s] ease-in-out outline-none mt-1 px-4 py-2',
  buttons_wrapper: 'flex flex-row justify-end items-center gap-x-6 mt-10',
  label: 'text-md font-medium text-[#edecf1] tracking-wider',
  date_input: 'outline-0 w-full font-medium text-sm text-[#E0E0E0] border-2 border-[#404144] rounded-md hover:bg-[#ffffff]/10 hover:border-[#edecf1] bg-transparent transition-all duration-[0.2s] ease-in-out outline-none mt-1 px-4 py-1 cursor-pointer',
  button: 'text-xs font-medium cursor-pointer text-[#edecf1] bg-transparent hover:bg-[#ffffff]/10 hover:border-[#edecf1] tracking-wider py-2 px-4 border-2 border-[#404144] whitespace-nowrap rounded-md transition-all duration-300 ease-in-out',
  new_requirement_icon: 'mt-1 text-xs font-medium cursor-pointer text-[#edecf1] bg-transparent hover:bg-[#ffffff]/10 hover:border-[#edecf1] tracking-wider py-3 px-3 border-2 border-[#404144] whitespace-nowrap rounded-md transition-all duration-300 ease-in-out',
  delete_requirement_icon: 'mt-0.5 text-xs text-[#BABABA] drop-shadow-[0_0_2px_#1A1A1A] hover:drop-shadow-[0_0_2px_#65D4C7] hover:text-[#28ECD4] cursor-pointer transition-all duration-[0.2s] ease-in-out',
  col_12: 'col-span-12'
};