/* istanbul ignore file */
import { Href } from "expo-router";

type Routes = [
  "signIn",
  "signInWelcome",
  "signUp",
  "forgotPassword",
  "onboarding",
  "home",
  "calendar",
  "archives",
  "newEvent",
][number];

type RoutesWithId = [
  "event",
  "eventSummary",
  "eventSettings",
  "editLocations",
  "addLocation",
  "addPool",
  "addBudget",
  "editGuests",
  "editDates",
  "editImportantMsg",
  "editNotes",
  "editPools",
][number];

export const screens: {
  routes: Record<Routes, Href>;
  routesWithId: Record<RoutesWithId, (id: Identifier) => Href>;
} = {
  routes: {
    signIn: "/sign-in",
    signInWelcome: "/sign-in/welcome",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
    onboarding: "/onboarding",
    home: "/home/events/list",
    calendar: "/calendar",
    archives: "/home/archives",
    newEvent: "/home/events/create",
  },
  routesWithId: {
    event: (id: Identifier) => ({
      pathname: `/event/[id]/chat`,
      params: { id },
    }),
    eventSummary: (id: Identifier) => ({
      pathname: `/event/[id]/summary`,
      params: { id },
    }),
    eventSettings: (id: Identifier) => ({
      pathname: `/event/[id]/settings`,
      params: { id },
    }),
    editLocations: (id: Identifier) => ({
      pathname: `/event/[id]/summary/edit-locations`,
      params: { id },
    }),
    addLocation: (id: Identifier) => ({
      pathname: `/event/[id]/summary/add-location`,
      params: { id },
    }),
    addPool: (id: Identifier) => ({
      pathname: `/event/[id]/summary/add-pool`,
      params: { id },
    }),
    addBudget: (id: Identifier) => ({
      pathname: `/event/[id]/summary/add-budget`,
      params: { id },
    }),
    editGuests: (id: Identifier) => ({
      pathname: `/event/[id]/summary/edit-guests`,
      params: { id },
    }),
    editDates: (id: Identifier) => ({
      pathname: `/event/[id]/summary/edit-dates`,
      params: { id },
    }),
    editImportantMsg: (id: Identifier) => ({
      pathname: `/event/[id]/summary/edit-important-msg`,
      params: { id },
    }),
    editNotes: (id: Identifier) => ({
      pathname: `/event/[id]/summary/edit-notes`,
      params: { id },
    }),
    editPools: (id: Identifier) => ({
      pathname: `/event/[id]/summary/edit-pools`,
      params: { id },
    }),
  },
} as const;
