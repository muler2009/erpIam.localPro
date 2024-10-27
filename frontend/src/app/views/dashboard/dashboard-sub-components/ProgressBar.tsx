

interface ProgressBarProps {
    progress: number; // Progress percentage (0-100)
    color?: string;   // Optional: Tailwind CSS color classes for the progress bar
  }
  
const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = 'bg-primary-green' }) => {
    // Ensure the progress is within 0-100
    const normalizedProgress = Math.max(0, Math.min(progress, 1000));
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-[5px]">
        <div
          className={`${color} h-full rounded-md w-full`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    );
};

export default ProgressBar