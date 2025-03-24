import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

function MyInput({ name }: { name: string }) {
  const form = useFormContext();

  const watchedValue = form.watch(name) as string;

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => {
        console.log(field.name, field.value, watchedValue);

        return (
          <div className="flex flex-col">
            <label htmlFor={name} className="mb-1">
              Field <span className="text-blue-700">{name}</span>
            </label>
            <input id={name} {...field} />
          </div>
        );
      }}
    />
  );
}

function FormFields() {
  const { watch, setValue } = useFormContext();

  const showFirstName = watch("showFirstName") as boolean;

  return (
    <>
      <div>
        <label htmlFor="showFirstName">Show first name</label>
        <input
          id="showFirstName"
          type="checkbox"
          className="ml-2"
          checked={showFirstName}
          onChange={(e) => setValue("showFirstName", e.target.checked)}
        />
      </div>

      {showFirstName ? (
        <MyInput name="firstName" />
      ) : (
        <MyInput name="lastName" />
      )}
    </>
  );
}

function App() {
  const form = useForm({
    defaultValues: {
      showFirstName: true,
      firstName: "Jan",
      lastName: "Novak",
    },
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => console.log(values))}
        className="flex flex-col container mx-auto my-10"
      >
        <div className="flex gap-x-10">
          <FormFields />
        </div>
      </form>
    </FormProvider>
  );
}

export default App;
