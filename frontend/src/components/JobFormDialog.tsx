import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Job } from '@/hooks';

interface JobFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingJob: Job | null;
  values: {
    companyName: string;
    jobTitle: string;
    applicationDate: string;
    status: string;
  };
  errors: Record<string, string>;
  loading: boolean;
  error: string;
  onOpenDialog: (job?: Job) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function JobFormDialog({
  open,
  onOpenChange,
  editingJob,
  values,
  errors,
  loading,
  error,
  onOpenDialog,
  onChange,
  onStatusChange,
  onSubmit,
  onClose,
}: JobFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenDialog()} className="w-full sm:w-auto">+ Add New Job</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[85vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl sm:text-2xl">
              {editingJob ? 'Edit Job Application' : 'Add New Job Application'}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              {editingJob ? 'Update your job application details below.' : 'Fill in the details of your new job application.'}
            </DialogDescription>
          </DialogHeader>

          {error && <p className="text-destructive text-sm mt-2">{error}</p>}

          <div className="space-y-5 py-5">
            <div className="space-y-2.5">
              <Label htmlFor="companyName" className="text-sm sm:text-base">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={values.companyName}
                onChange={onChange}
                placeholder="e.g., Google"
                className={`text-base ${errors.companyName ? 'border-destructive' : ''}`}
              />
              {errors.companyName && (
                <p className="text-xs text-destructive mt-1">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="jobTitle" className="text-sm sm:text-base">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={values.jobTitle}
                onChange={onChange}
                placeholder="e.g., Software Engineer"
                className={`text-base ${errors.jobTitle ? 'border-destructive' : ''}`}
              />
              {errors.jobTitle && (
                <p className="text-xs text-destructive mt-1">{errors.jobTitle}</p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="applicationDate" className="text-sm sm:text-base">Application Date</Label>
              <Input
                id="applicationDate"
                name="applicationDate"
                type="date"
                value={values.applicationDate}
                onChange={onChange}
                max={new Date().toISOString().split('T')[0]}
                className={`text-base ${errors.applicationDate ? 'border-destructive' : ''}`}
              />
              {errors.applicationDate && (
                <p className="text-xs text-destructive mt-1">{errors.applicationDate}</p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="status" className="text-sm sm:text-base">Status</Label>
              
              {/* Mobile: Select Dropdown */}
              <div className="sm:hidden">
                <Select value={values.status} onValueChange={onStatusChange}>
                  <SelectTrigger className={`text-base ${errors.status ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tablet & Desktop: Pill Buttons */}
              <div className="hidden sm:flex gap-2 flex-wrap">
                <Button
                  type="button"
                  variant={values.status === 'Applied' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('Applied')}
                  className="rounded-full"
                >
                  Applied
                </Button>
                <Button
                  type="button"
                  variant={values.status === 'Interview' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('Interview')}
                  className="rounded-full"
                >
                  Interview
                </Button>
                <Button
                  type="button"
                  variant={values.status === 'Offer' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('Offer')}
                  className="rounded-full"
                >
                  Offer
                </Button>
                <Button
                  type="button"
                  variant={values.status === 'Rejected' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('Rejected')}
                  className="rounded-full"
                >
                  Rejected
                </Button>
              </div>

              {errors.status && (
                <p className="text-xs text-destructive mt-1">{errors.status}</p>
              )}
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto order-2 sm:order-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto order-1 sm:order-2">
              {loading ? 'Saving...' : editingJob ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
