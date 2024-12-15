/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  renderHook as originalRenderHook,
  RenderHookResult,
} from "@testing-library/react-native";
import { ComponentType, ReactNode } from "react";
import { Dependencies } from "@app/dependencies/Dependencies.type";
import { Provider } from "react-redux";
import { DependenciesProvider } from "@app/react/useDependencies";
import { AuthContextProvider } from "@authentication/ui/hooks/useAuthentication";
import { AppStore } from "@store/store";
import { app } from "@app/main";
import { RouterProvider } from "@app/router/useRouter";

const Wrapper: ComponentType<{
  children: ReactNode;
  dependencies?: Partial<Dependencies>;
  store?: AppStore;
  ExtendedWrapper?: ComponentType<any>;
}> = ({ children, dependencies, ExtendedWrapper, store }) => (
  <Provider store={store ?? app.store}>
    <DependenciesProvider dependencies={dependencies}>
      <RouterProvider>
        <AuthContextProvider>
          {ExtendedWrapper ? (
            <ExtendedWrapper>{children}</ExtendedWrapper>
          ) : (
            children
          )}
          {children}
        </AuthContextProvider>
      </RouterProvider>
    </DependenciesProvider>
  </Provider>
);

export type RenderHookOptions<Props> = {
  initialProps?: Props;
  wrapper?: ComponentType<any>;
  dependencies?: Partial<Dependencies>;
  store?: AppStore;
};

export function renderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: RenderHookOptions<Props>,
): RenderHookResult<Result, Props> {
  return originalRenderHook(renderCallback, {
    initialProps: options?.initialProps,
    wrapper: ({ children }) => (
      <Wrapper
        dependencies={options?.dependencies}
        store={options?.store}
        ExtendedWrapper={options?.wrapper}
        children={children}
      />
    ),
  });
}
