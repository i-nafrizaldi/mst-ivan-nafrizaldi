'use client';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import ItemProduct from '@/components/ItemProduct';
import LeftNavbar from '@/components/LeftNavbar';
import { Label } from '@/components/ui/label';
import useUpdateTransaction from '@/hooks/transaction/useUpdateTransaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import TransactionTable from '../components/TransactionTable';
import { ValidationSchema } from './ValidationSchema';
import { Sale } from '@/types/sale.type';
import { Button } from '@/components/ui/button';

interface SaleDetail {
  productId: string;
  qty: string;
  discountPct: string;
}

interface CreateTransaction extends Pick<Sale, 'discount' | 'shipingCost'> {
  saleDetail: SaleDetail[];
}

// interface CreateTransaction extends Pick<Sale, 'discount' | 'shipingCost'> {
//   saleDetail: [];
// }

const CreateTransaction = ({ params }: { params: { id: number } }) => {
  const { updateTransaction } = useUpdateTransaction(params.id);

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      discount: '',
      shipingCost: '',
      saleDetail: [{ productId: '', qty: '', discountPct: '' }],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'saleDetail',
  });
  const handleAddItem = () =>
    append({ productId: '', qty: '', discountPct: '' });
  const handleRemoveItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // function onSubmit(values: any) {
  //   updateTransaction(values);
  // }

  const onSubmit = async (values: any) => {
    try {
      console.log('Form Values:', values);
      await updateTransaction(values);
      console.log('Transaction updated successfully.');
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  return (
    <main className="container bg-[#f4f4f4]">
      <section className="flex py-6 gap-4">
        {/* LEFT SECTION */}
        <LeftNavbar />
        {/* RIGHT SECTION */}
        <div className="w-full rounded-xl bg-white p-4 flex flex-col gap-6">
          <h1 className="font-extrabold text-3xl">Create Transaction</h1>
          <div>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex flex-col gap-3">
                    <Label className="mt-1">Laundry Items</Label>
                    <div className="flex flex-col bg-mythemes-secondaryblue/20 px-4 pt-2 pb-4 rounded-md">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4">
                          <div className="w-3/4">
                            <FormSelect
                              name={`saleDetail.${index}.productId`}
                              label=""
                              placeholder="Select a Product Item"
                              form={form}
                              item={<ItemProduct />}
                            />
                          </div>
                          <div>
                            <FormInput
                              name={`saleDetail.${index}.qty`}
                              type="number"
                              label=""
                              placeholder="Enter Qty"
                              min={1}
                              form={form}
                            />
                          </div>
                          <div>
                            <FormInput
                              name={`saleDetail.${index}.discountPct`}
                              type="number"
                              label=""
                              placeholder="Enter Discount Percentage"
                              form={form}
                            />
                          </div>
                          <div className="mt-2 flex items-center justify-center">
                            {fields.length > 1 ? (
                              <Trash2
                                onClick={() => handleRemoveItem(index)}
                                className="text-mythemes-maingreen cursor-pointer"
                              />
                            ) : (
                              <Trash2 className="text-mythemes-maingreen opacity-50 cursor-not-allowed" />
                            )}
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={handleAddItem}
                        className="bg-mythemes-secondaryblue/40 rounded-md mt-4 p-1 cursor-pointer"
                      >
                        <Plus className="text-mythemes-maingreen mx-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <FormInput
                      name="discount"
                      type="number"
                      label="Discount"
                      placeholder="Discount"
                      form={form}
                    />

                    <FormInput
                      name="shipingCost"
                      type="number"
                      label="Shiping Cost"
                      placeholder="Shiping Cost"
                      form={form}
                    />
                  </div>
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </FormProvider>
          </div>
          <div>
            <TransactionTable id={params.id} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateTransaction;
