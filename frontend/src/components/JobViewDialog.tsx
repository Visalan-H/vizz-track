import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import type { Job } from '@/hooks';

interface JobViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
  onEdit: (job: Job) => void;
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

export default function JobViewDialog({ open, onOpenChange, job, onEdit }: JobViewDialogProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.companyName}</DialogTitle>
          <DialogDescription className="text-base pt-1">
            Job Application Details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Job Title</Label>
            <p className="text-base font-medium">{job.jobTitle}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Application Date</Label>
            <p className="text-base font-medium">
              {new Date(job.applicationDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Status</Label>
            <div>
              <Badge className={`${getStatusColor(job.status)} hover:${getStatusColor(job.status)} text-sm px-4 py-1.5 rounded-lg font-medium`}>
                {job.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Created</Label>
            <p className="text-sm">
              {new Date(job.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button 
            onClick={() => {
              onOpenChange(false);
              onEdit(job);
            }}
            className="w-full sm:w-auto"
          >
            Edit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
