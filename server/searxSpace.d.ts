// declare module "InstancesInfo" {
export interface Ip46 {
  reverse?: any;
  field_type: string;
  asn_cidr: string;
}

export interface IpsMeta {
  [key: string]: Ip46;
}

export interface Metadata {
  timestamp: number;
  ips: IpsMeta;
  ipv6: boolean;
}

export interface AlternativeUrls {
  [key: string]: string;
}

export interface Http {
  status_code: number;
  error?: any;
  grade: string;
  gradeUrl: string;
}

export interface All {
  value: number;
}

export interface Server {
  value: number;
}

export interface Initial {
  success_percentage: number;
  all: All;
  server: Server;
}

export interface Load {
  median: number;
  stdev: number;
  mean: number;
}

export interface Search {
  success_percentage: number;
  all: All;
  server: Server;
  load: Load;
}

export interface SearchWp {
  success_percentage: number;
  all: All;
  server: Server;
  load: Load;
}

export interface SearchGo {
  success_percentage: number;
  all: All;
  server: Server;
  load: Load;
}

export interface Timing {
  initial: Initial;
  search: Search;
  search_wp: SearchWp;
  search_go: SearchGo;
}

export interface Issuer {
  commonName: string;
  countryName: string;
  organizationName: string;
}

export interface Subject {
  commonName: string;
  countryName?: any;
  organizationName?: any;
  altName: string;
}

export interface Certificate {
  issuer: Issuer;
  subject: Subject;
  version: number;
  serialNumber: string;
  notBefore: string;
  notAfter: string;
  OCSP: string[];
  caIssuers: string[];
  sha256: string;
  signatureAlgorithm: string;
}

export interface Tls {
  version: string;
  certificate: Certificate;
  grade: string;
  gradeUrl: string;
}

export interface HashRef {
  hashRef: number;
}

export interface Img {
  [key: string]: HashRef;
}

export interface Link {
  [key: string]: HashRef;
}

export interface Other {
  [key: string]: HashRef;
}

export interface Script {
  [key: string]: HashRef;
}

export interface Ressources {
  img: Img;
  inline_script: any[];
  inline_style: any[];
  link: Link;
  other: Other;
  script: Script;
}

export interface Html {
  ressources: Ressources;
  grade: string;
}

export interface EngineError {
  error_rate: number;
  errors: number[];
}

export interface EngineErrors {
  [key: string]: EngineError;
}

export interface IP {
  reverse?: any;
  field_type: string;
  asn_cidr: string;
  https_port: boolean;
}

export interface Ips {
  [key: string]: IP;
}

export interface Network {
  ips: Ips;
  ipv6: boolean;
  asn_privacy: number;
  dnssec: number;
}

export interface Instance {
  analytics: boolean;
  comments: any[];
  alternativeUrls: AlternativeUrls;
  main: boolean;
  network_type: string;
  http: Http;
  version: string;
  git_url: string;
  generator: string;
  contact_url: string;
  docs_url: string;
  timing: Timing;
  tls: Tls;
  html: Html;
  engines: EngineErrors;
  network: Network;
}

export interface Instances {
  [key: string]: Instance;
}

export interface Stats {
  instance_count: number;
  stats_count: number;
  error_rate?: any;
}

export interface Engine {
  categories: string[];
  language_support: boolean;
  paging: boolean;
  safesearch: boolean;
  shortcut: string;
  time_range_support: boolean;
  stats: Stats;
}

export interface Engines {
  [key: string]: Engine;
}

export interface Hash {
  count: number;
  hash: string;
  forks: number[];
  unknown?: boolean;
}

export interface Ip46subnet {
  asn: string;
  asn_country_code: string;
  asn_description: string;
  asn_privacy: number;
  network_country: string;
}

export interface Cidrs {
  ip46subnet: Ip46subnet;
}

export interface SpaceInstances {
  metadata: Metadata;
  instances: Instances;
  engines: Engines;
  engine_errors: string[];
  categories: string[];
  hashes: Hash[];
  cidrs: Cidrs;
  forks: string[];
}
// }
