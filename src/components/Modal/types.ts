interface WorkTimelineModalProps {
    company: CompanyProps
    closeModal: () => void
}

interface CompanyProps {
    name: string;
    position: { x: number, y: number }
}
