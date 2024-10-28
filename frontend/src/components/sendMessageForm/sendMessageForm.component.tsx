import { Textarea, Button } from "@nextui-org/react";
import { ArrowUp } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Message = {
  messageId: string;
  messageContent: string;
  isBot: boolean;
  // Add timestamp
};

interface Props {
  setMessages: (
    messages: Message[] | ((prevMessages: Message[]) => Message[])
  ) => void;
}

const formSchema = z.object({
  message: z.string().min(1),
});

export const SendMessageForm = ({ setMessages }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error | null>(null);

  // TODO: send message to backend
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submittedMessage = {
      messageId: uuidv4(),
      messageContent: values.message,
    };

    setMessages((prevMessages: Message[]) => [
      ...prevMessages,
      { ...submittedMessage, isBot: false },
    ]);

    setLoading(true);

    // TODO: handle errors as a toast
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/query_model",
        submittedMessage
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          messageId: response.data.messageId,
          messageContent: response.data.messageContent,
          isBot: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
    form.resetField("message");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  maxRows={8}
                  minRows={1}
                  size="lg"
                  placeholder="Enter your message"
                  endContent={
                    <Button isIconOnly type="submit" disabled={loading}>
                      <ArrowUp />
                    </Button>
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Gemini can make mistakes. Check important info.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
