import { getNextCode } from "../../utils/codeGenerator.js";

export const initProjHelp = async ProjHelpModel => {
    try {
        const defaultProjHelpData = [
            {
                data: "Active",
                tag: "01",
            },
            {
                data: "Inactive",
                tag: "01",
            },
            {
                data: "Pending",
                tag: "02",
            },
            {
                data: "WIP",
                tag: "02",
            },
            {
                data: "Completed",
                tag: "02",
            },
            {
                data: "Administrator",
                tag: "03",
            },
            {
                data: "Developer",
                tag: "03",
            }
        ];

        // Check if any data already exists in the table
        const existingCount = await ProjHelpModel.count();
        
        // If data already exists, skip seeding
        if (existingCount > 0) {
            console.log('✅ Project Help data already exists. Skipping seeding.');
            return;
        }

        console.log('🌱 Seeding initial Project Help data...');

        // Seed data only if table is empty
        for (let { data, tag } of defaultProjHelpData) {
            const nextCode = await getNextCode(ProjHelpModel, "code", '3');
            
            const [_, created] = await ProjHelpModel.findOrCreate({
                where: { code: nextCode },
                defaults: {
                    data,
                    tag,
                }
            });
            if (created) {
                console.log(`✅ Project Help '${data}' inserted.`);
            }
        }
        
        console.log('🎉 Project Help seeding completed!');
    } catch (error) {
        throw new Error(`Error initializing Project Help: ${error.message}`);
    }
};