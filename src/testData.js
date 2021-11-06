let data=[
    {
        "id": 6,
        "parent_id": 0,
        "name": "李冰有限公司A",
        "eleId":123,
        "children": [
            {
                "id": 7,
                "parent_id": 6,
                "name": "财务部",
                "children": []
            },
            {
                "id": 108,
                "parent_id": 6,
                "name": "第二个部门",
                "children": []
            }
        ]
    },
    {
        "id": 61,
        "parent_id": 0,
        "name": "好未来科技",
        "eleId":123,
        "children": []
    },
    {
        "id": 6,
        "parent_id": 0,
        "name": "李冰有限公司B",
        "children": [
            {
                "id": 7,
                "parent_id": 6,
                "name": "财务部",
                "children": []
            },
            {
                "id": 108,
                "parent_id": 6,
                "name": "第二个部门",
                "children": []
            }
        ]
    },
    {
        "id": 13,
        "parent_id": 0,
        "name": "李冰有限公司C",
        "children": [
            {
                "id": 7,
                "parent_id": 6,
                "name": "财务部",
                "children": [
                    {
                        "id": 92,
                        "parent_id": 92,
                        "name": "U城天街店",
                        "children": []
                    }
                ]
            },
            {
                "id": 108,
                "parent_id": 6,
                "name": "第二个部门",
                "children": []
            }
        ]
    },
    {
        "id": 92,
        "parent_id": 47,
        "name": "海豹战区",
        "children": [
            {
                "id": 93,
                "parent_id": 92,
                "name": "U城天街店",
                "children": []
            }
        ]
    }
]
export default data;