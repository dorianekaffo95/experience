import FooterBlockType from '../../../types/FooterBlockType';
import { FooterBlock } from '../../../../data/models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';
import { MdTitle } from 'react-icons/lib/md';

import translate from '../../../../core/translate';

const CreateFooterSetting = {

    type: FooterBlockType,

    args: {
        id: { type: IntType },
        title1: { type: StringType },
        content1: { type: StringType },
        title2: { type: StringType },
        content2: { type: StringType },
        title3: { type: StringType},
        content3: { type: StringType },       
    },

    async resolve({ request }, {
        id,
        title1,
        content1,
        title2,
        content2,
        title3,
        content3
    }) {

        if (request.user && request.user.admin == true) {

            const isFooterIdAvailable = await FooterBlock.findOne({ where: { id: 1 } });

            if (isFooterIdAvailable != null){
                const updateFooter = await FooterBlock.update({
                    title1: title1,
                    content1: content1,
                    title2: title2,
                    content2: content2,
                    title3: title3,
                    content3: content3
                },
                    {
                        where: {
                            id: 1
                        }
                    }
                 ); 
            }
            else{
                const createFooter = await FooterBlock.create({
                    title1: title1,
                    content1: content1,
                    title2: title2,
                    content2: content2,
                    title3: title3,
                    content3: content3
                }) 
            }

            // Site Name
            await translate([
                {
                    id: `footerBlock.title1`,
                    description: `Footer block title 1`,
                    defaultMessage: title1,
                    message: title1
                },
                {
                    id: `footerBlock.content1`,
                    description: `Footer block content 1`,
                    defaultMessage: content1,
                    message: content1
                },
                {
                    id: `footerBlock.title2`,
                    description: `Footer block title 2`,
                    defaultMessage: title2,
                    message: title2
                },
                {
                    id: `FooterBlock.content2`,
                    description: `Footer block content 2`,
                    defaultMessage: content2,
                    message: content2
                },
                {
                    id: `footerBlock.title3`,
                    description: `Footer block title 3`,
                    defaultMessage: title3,
                    message: title3
                },
                {
                    id: `footerBlock.content3`,
                    description: `Footer block content 3`,
                    defaultMessage: content3,
                    message: content3
                },
              ]);
               
                return {
                    status: 'success'
                }            
        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default CreateFooterSetting;
