import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { validateCompanyName, validateJobTitle, validateApplicationDate } from '@/validations/jobValidations';
import Navbar from '@/components/Navbar';
import JobCard from '@/components/JobCard';
import JobFormDialog from '@/components/JobFormDialog';
import JobViewDialog from '@/components/JobViewDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { useJobCRUD, useForm, type Job } from '@/hooks';

export default function Jobs() {
  const { jobs, loading, createJob, updateJob, deleteJob } = useJobCRUD();
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const { values, errors, handleChange, handleSelectChange, handleSubmit, resetForm: formReset, setValues } = useForm({
    initialValues: {
      companyName: '',
      jobTitle: '',
      applicationDate: '',
      status: 'Applied' as Job['status']
    },
    validationSchema: {
      companyName: validateCompanyName,
      jobTitle: validateJobTitle,
      applicationDate: validateApplicationDate
    }
  });

  const resetForm = () => {
    formReset();
    setEditingJob(null);
    setError('');
  };

  const handleOpenDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setValues({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        applicationDate: job.applicationDate.split('T')[0],
        status: job.status
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(resetForm, 200);
  };

  const onSubmit = async (e: React.FormEvent) => {
    const result = await handleSubmit(e);
    
    if (!result.success) {
      const errorFields = Object.keys(result.errors);
      if (errorFields.length === 1) {
        const firstError = result.errors[errorFields[0] as keyof typeof result.errors];
        toast.error(`Please check: ${firstError}`);
      } else {
        toast.error(`Please fix ${errorFields.length} field errors before submitting`);
      }
      return;
    }

    setError('');
    
    if (editingJob) {
      await updateJob(editingJob._id, values, editingJob.status);
    } else {
      await createJob(values);
    }
    
    handleCloseDialog();
  };

  const handleDeleteClick = (jobId: string) => {
    setJobToDelete(jobId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;

    await deleteJob(jobToDelete);
    setIsDeleteDialogOpen(false);
    setJobToDelete(null);
  };

  const handleViewJob = (job: Job) => {
    setViewingJob(job);
    setIsViewDialogOpen(true);
  };

  const handleStatusChange = (value: string) => {
    handleSelectChange('status', value);
  };

  const filteredJobs = statusFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.status === statusFilter);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-6 p-5 sm:p-6 lg:p-8 pb-8 mt-[50px] sm:mt-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-6">
          <div className="text-center sm:text-left space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Job Applications</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Track your job applications and interview progress</p>
          </div>
          <JobFormDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            editingJob={editingJob}
            values={values}
            errors={errors}
            loading={loading}
            error={error}
            onOpenDialog={handleOpenDialog}
            onChange={handleChange}
            onStatusChange={handleStatusChange}
            onSubmit={onSubmit}
            onClose={handleCloseDialog}
          />
        </div>

        <div className="sm:hidden flex items-center gap-3">
          <Label htmlFor="statusFilter" className="text-sm whitespace-nowrap">Status:</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="statusFilter" className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Applications</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="hidden sm:flex items-center gap-3 flex-wrap">
          <Label className="text-sm sm:text-base whitespace-nowrap">Status:</Label>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('All')}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'Applied' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Applied')}
              className="rounded-full"
            >
              Applied
            </Button>
            <Button
              variant={statusFilter === 'Interview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Interview')}
              className="rounded-full"
            >
              Interview
            </Button>
            <Button
              variant={statusFilter === 'Offer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Offer')}
              className="rounded-full"
            >
              Offer
            </Button>
            <Button
              variant={statusFilter === 'Rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('Rejected')}
              className="rounded-full"
            >
              Rejected
            </Button>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-base sm:text-lg text-muted-foreground">
            Total Applications: <span className="font-semibold text-foreground">{filteredJobs.length}</span>
            {statusFilter !== 'All' && <span className="text-sm"> ({jobs.length} total)</span>}
          </p>
        </div>

        {loading && jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 sm:py-16 border border-border rounded-xl">
            <p className="text-muted-foreground text-sm sm:text-base px-4">
              {statusFilter === 'All' 
                ? "No job applications yet. Click \"Add New Job\" to get started!" 
                : `No ${statusFilter} applications found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onView={handleViewJob}
                onEdit={handleOpenDialog}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setJobToDelete(null)}
        />

        <JobViewDialog
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          job={viewingJob}
          onEdit={handleOpenDialog}
        />
      </div>
    </>
  );
}
