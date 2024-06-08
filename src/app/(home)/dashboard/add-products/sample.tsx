<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
    {currentStep == 0 && (
      <>
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sample Product Name"
                    {...field}
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="$5"
                    {...field}
                    type="number"
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <TextEditor
                  value={field.value}
                  disabled={status === "executing" ? true : false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            className=""
            onClick={(e) => {
              e.preventDefault();
              setPage(page - 1);
              // form.
            }}
          >
            <ChevronLeft className="w-6 h-6" />
            Products
          </Button>
          <Button disabled>
            Add Varients
            <ChevronRight
              className="w-6 h-6"
              onClick={(e) => e.preventDefault()}
            />
          </Button>
        </div>
      </>
    )}
    {currentStep == 1 && (
      <>
        {fields?.map((field, index) => (
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            key={field.id}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn(
                  "relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden",
                  errors?.jobs?.[index] && "text-red-700"
                )}
              >
                {`Work Experience ${index + 1}`}

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-8"
                  onClick={() => remove(index)}
                >
                  <Trash2Icon className="h-4 w-4 " />
                </Button>
                {errors?.jobs?.[index] && (
                  <span className="alert absolute right-8">
                    <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className={cn(
                    "relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3"
                  )}
                >
                  <FormField
                    control={form.control}
                    name={`jobs.${index}.jobtitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job title</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`jobs.${index}.employer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employer</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`jobs.${index}.startdate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`jobs.${index}.enddate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </>
    )}
    {/* <Button disabled={loading} className="ml-auto" type="submit">
    {action}
  </Button> */}
  </form>
</Form>;
