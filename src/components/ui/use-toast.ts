// A simplified toast hook
export const useToast = () => {
  const toast = ({ title, description, variant }: { title: string; description?: string; variant?: string }) => {
    // In a real implementation, this would show a toast notification
    console.log(`Toast: ${title} - ${description} (${variant})`);
  };

  return { toast };
};