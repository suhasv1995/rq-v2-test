import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { ReactQueryCacheProvider, useQuery } from "react-query";

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data");
    }, 100);
  });
};

describe("useQuery Hook", () => {
  it("useQuery - v2", async () => {
    const wrapper = ({ children }) => (
      <ReactQueryCacheProvider>{children}</ReactQueryCacheProvider>
    );
    let id = "";
    const { rerender, result, waitForNextUpdate } = renderHook(
      () =>
        useQuery({
          queryKey: ["dummy", id],
          queryFn: () => {
            if (!id) {
              return Promise.resolve("no id");
            }
            return fetchData();
          },
        }),
      { wrapper }
    );

    expect(result.current.data).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.data).toEqual("no id");
    id = "something";

    rerender();
    expect(result.current.data).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.data).toEqual("data");
  });
});
