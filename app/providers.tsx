"use client";

import { apolloClient } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";

interface ProvidersProps {
 children: ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
 return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
