export const reportParams = {
    rpt1:{
        params:[
            {
                type:"dropdown",
                label: "Material",
                endPoint: `/api/feat/char/5`
            }, 
            {
                type:"dropdown",
                label: "Color",
                endPoint: `/api/feat/char/5`
            }, 
            {
                type:"calendar",
                label: "Order Date",
                endPoint: "asdadasdasd"
            }
        ]
    },
    rpt2:{
        params:[
            {
                type:"calendar",
                label: "Order Date",
                endPoint: "asdadasdasd"
            },
            {
                type:"dropdown",
                label: "Material",
                endPoint: `/api/feat/char/5`
            }
        ]
    },
    rpt3:{
        params:[
            {
                type:"dropdown",
                label: "Color",
                endPoint: `/api/feat/char/5`
            }
        ]
    }
}