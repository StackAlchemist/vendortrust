interface FeatureCardProps {
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}
export default FeatureCard