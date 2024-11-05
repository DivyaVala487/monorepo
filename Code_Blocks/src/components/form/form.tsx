import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import React from "react";

const Form = () => {
  return (
    <div>
      <form
        // onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        //   event.preventDefault();
        //   setOpen(false);
        // }}
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input autoFocus required />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input required />
          </FormControl>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </div>
  );
};

export default Form;
