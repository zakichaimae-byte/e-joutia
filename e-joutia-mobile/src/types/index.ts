export interface AdData {
  title: string;
  description: string;
  price: string;
  category: string;
  condition: string;
}

export type RootStackParamList = {
  Home: undefined;
  Publish: undefined;
  Success: {
    ad: AdData;
    images: string[]; // local URIs of selected images
  };
  AdDetail: {
    ad: AdData;
    images: string[]; // local URIs of selected images
  };
};
