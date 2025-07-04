// {
//     "@context": "http://www.daostar.org/schemas",
//     "name": "<name of the entity>",
//     "type": "<entity type, e.g. DAO or Person>",
//     "projects": [
//         {
//         "type": "Project",
//         "id": "<The id of the proposal, in the format specified above.>",
//         "name": "<The name of the project.>",
//         "description": "<A description of the project.>",
//         "contentURI": "<A longer description of the project forming the core of a pitch for the project, including such things as activities proposed, milestones, team, impact assessment, past history, contact information, and so on.>",
//         "email": "<OPTIONAL: A working email address through which the project can respond to grant inquiries and requests.>",
//         "membersURI": "<OPTIONAL: A URI pointing to a JSON of members of the project, following the DAOIP-2 Members JSON-LD Schema.>",
//         "attestationIssuersURI": "<RECOMMENDED: A URI pointing to a JSON of trusted issuers of attestations and credentials about the project and its members, following the DAOIP-3 Attestation Issuers JSON-LD Schema.>",
//         "relevantTo": "<OPTIONAL: An array of (GrantPool id, GrantPool name) intended to call attention to specific grant pools for which this project is relevant. This does not constitute a formal grant application unless recognized by the grant pool.>",
//         "image": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a square logo.>",
//         "coverImage": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a large, rectangular background image.>",
//         "licenseURI": "<OPTIONAL: A URI pointing to the project's open-source license or relevant licensing details>",
//         "socials": [
//                 {
//                 "name": "<The name of the social platform>",
//                 "value":  "<An URI of the social platform profile of the project"
//                 } 
//             ]
//         }
//     ]
// }

import { Address } from "viem"

export type DAOIP5ProjectSocial = {
    name: string,
    value: string
}

export type ProjectContract = {
    chainId: number,
    address: Address,
    name?: string
}


export type DAOIP5ProjectMetadata = {
    "@context": "http://www.daostar.org/schemas",
    "name": string,
    "type": "Project",
    "description": string,
    "contentURI"?: string,
    "email"?: string,
    "membersURI"?: string,
    "attestationIssuersURI"?: string,
    "relevantTo"?: Array<{ id: string, name: string }>,
    "image"?: string,
    "coverImage"?: string,
    "licenseURI"?: string,
    "socials"?: DAOIP5ProjectSocial[],
    //addendeum
    "contracts"?: ProjectContract[]
}