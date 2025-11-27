interface LabelProps {
    label: string;
}

const Label = ({ label }: LabelProps) => {
    return (
        <label className="label">
            <span className="label-text font-medium">{label}</span>
        </label>
    )
}

export default Label