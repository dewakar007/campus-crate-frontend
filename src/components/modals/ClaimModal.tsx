import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send } from "lucide-react";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
  claimQuestion?: string;
}

export function ClaimModal({ isOpen, onClose, itemId, itemTitle, claimQuestion }: ClaimModalProps) {
  const [answer, setAnswer] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      toast({
        title: "Required field missing",
        description: "Please answer the verification question.",
        variant: "destructive",
      });
      return;
    }

    if (!contactInfo.trim()) {
      toast({
        title: "Contact info required",
        description: "Please provide your contact information.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Call API to submit claim
      // await submitClaim(itemId, { answer, contactInfo, additionalInfo });
      
      toast({
        title: "Claim submitted successfully!",
        description: "The owner will be notified and will contact you if your answer is correct.",
      });
      
      onClose();
      resetForm();
    } catch (error) {
      toast({
        title: "Failed to submit claim",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setAnswer('');
    setContactInfo('');
    setAdditionalInfo('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Claim Item: {itemTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {claimQuestion && (
            <div className="space-y-2">
              <Label htmlFor="answer" className="text-sm font-medium">
                Verification Question
              </Label>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                {claimQuestion}
              </p>
              <Textarea
                id="answer"
                placeholder="Your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                className="resize-none"
                rows={3}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm font-medium">
              Contact Information *
            </Label>
            <Input
              id="contact"
              placeholder="Email or phone number"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional" className="text-sm font-medium">
              Additional Information (Optional)
            </Label>
            <Textarea
              id="additional"
              placeholder="Any additional details that might help verify your claim..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-24"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Claim
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}