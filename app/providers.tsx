"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apollo-client";

interface ProvidersProps {
 children: ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
 return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
