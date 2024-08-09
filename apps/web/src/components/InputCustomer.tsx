'use client';
import useCreateTransaction from '@/hooks/transaction/useCreateTransaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { number, z } from 'zod';
import FormSelect from './FormSelect';
import ItemCustomer from './ItemCustomer';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Form } from './ui/form';

const FormSchema = z.object({
  cust_id: z.string({
    required_error: 'Please select an email to display.',
  }),
});

const InputCustomer = () => {
  const { createTransaction } = useCreateTransaction();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'all',
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createTransaction(data);
    setIsOpen(false);
    toast.success(data.cust_id);
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Create Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormSelect
                form={form}
                item={<ItemCustomer />}
                label="Customer"
                name="cust_id"
                placeholder="Select a customer"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InputCustomer;
