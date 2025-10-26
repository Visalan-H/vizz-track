import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/hooks';

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

const getStatusColor = (status: Job['status']) => {
  switch (status) {
    case 'Applied': return 'bg-blue-500';
    case 'Interview': return 'bg-yellow-500';
    case 'Offer': return 'bg-green-500';
    case 'Rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export default function JobCard({ job, onView, onEdit, onDelete }: JobCardProps) {
  return (
    <div 
      className="p-5 sm:p-5 border border-border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onView(job)}
    >
      {/* Top: Company + Status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-lg sm:text-xl font-bold wrap-break-word flex-1">{job.companyName}</h3>
        <Badge className={`${getStatusColor(job.status)} hover:${getStatusColor(job.status)} shrink-0 text-xs px-3 py-1 rounded-lg font-medium`}>
          {job.status}
        </Badge>
      </div>

      {/* Middle: Job Title */}
      <p className="text-sm sm:text-base text-muted-foreground mb-4 wrap-break-word">{job.jobTitle}</p>

      {/* Bottom: Date + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Applied: {new Date(job.applicationDate).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 sm:flex-initial rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(job);
            }}
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 sm:flex-initial rounded-lg text-destructive border-destructive hover:bg-destructive hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(job._id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
