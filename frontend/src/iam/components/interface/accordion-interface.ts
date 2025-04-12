
export interface AccordionItem {
    id: number;
    title: string;
    content: React.ReactNode
  }
  
export interface AccordionProps {
    accordionItems: AccordionItem[];
}