
function FilterData(arr:any[]) {
    let data = arr;

    function createHash(hashLength:Number) {
        // 默认长度 24
        return Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36))
            .join('');
    }
    var mapKey:any = {
        "": "name",
        "__3": "enname",
        "__6": "introduce",
        "__9": "location",
        "__11": "order",
        "专业信息": "majors",
    }
    var mapMajor:any = {
        "__14": "order",
        "__16": "introduce",
        "__18": "orientation",
        "录取信息": "enrollDate",
        "__20": "enrollNums",
        "留学费用": "schooling",
        "__21": "applicationFee",
        "就业情况": "averageSalary",
        "__22": "employmentRate",
        "师资情况": "regularTeacher",
        "__23": "t_sRatio",
    }
    var mapMajorKey:any = {
        "教育学": "education",
        "商科": "business",
        "法学": "law",
        "医学": "medicine",
        "工程": "engineering",
        "护理": "nursing",
        "计算机科学": "computer",
        "社会科学": "society",
        "公共事务": "publicAffairs",
        "心理学": "psychics",
        "艺术": "art",
        "英语": "english"
    }
    var mapMajorKeyReserve:any = {
        "education": "教育学",
        "business": "商科",
        "law": "法学",
        "medicine": "医学",
        "engineering": "工程",
        "nursing": "护理",
        "computer": "计算机科学",
        "society": "社会科学",
        "publicAffairs": "公共事务",
        "psychics": "心理学",
        "art": "艺术",
        "english": "英语"
    }
    data.splice(0, 1)
    // 映射key
    var arr1 = data.map(function (item:any) {
        let obj:any = {}
        Object.keys(mapMajor).map(function (items) {
            if (mapMajor[items] === 'enrollDate' || mapMajor[items] === 'enrollNums') {
                obj['enrollInfo'] = {
                    enrollDate: item['录取信息'],
                    enrollNums: item['__20'],
                }
            } else if (mapMajor[items] === 'schooling' || mapMajor[items] ===
                'applicationFee') {
                obj['cost'] = {
                    schooling: item['留学费用'],
                    applicationFee: item['__21'],
                }
            } else if (mapMajor[items] === 'employmentRate' || mapMajor[items] ===
                'averageSalary') {
                obj['employment'] = {
                    employmentRate: item['__22'],
                    averageSalary: item['就业情况'],
                }
            } else if (mapMajor[items] === 'regularTeacher' || mapMajor[items] === 't_sRatio') {
                obj['teacherResources'] = {
                    regularTeacher: item['师资情况'],
                    t_sRatio: item['__23'],
                }
            } else {
                obj[mapMajor[items]] = item[items]
            }
            obj.enName = mapMajorKey[item["专业信息"]]
            obj.name = mapMajorKeyReserve[obj.enName]
        })

        item["majors"] = {
            [mapMajorKey[item["专业信息"]]]: obj
        }
        item["name"] = item[""]
        item["enname"] = item["__3"]
        item["introduce"] = item["__6"]
        item["location"] = item["__9"]
        item["order"] = item["__11"]
        return item
    })

    // 合并专业
    let curItem:any = {}
    var arr2 = arr1.map(function (item:any) {
        if (item["name"]) {
            curItem = item
        } else {
            curItem.majors = {
                ...curItem.majors,
                ...item.majors
            }
        }
        return curItem
    })


    // 去重
    var obj:any = {};
    var arr3 = arr2.reduce(function (item:any, next:any) {
        obj[next.name] ? '' : obj[next.name] = true && item.push(next);
        return item;
    }, []);


    // 映射最终结果
    var arr4 = arr3.map(function (item:any) {
        let obj:any = {}
        Object.keys(mapKey).map(function (items) {
            obj[mapKey[items]] = item[mapKey[items]]
        })
        obj.id = createHash(6) + item.enname.split(" ").join("").replace(/\(.*?\)/g, '').toLowerCase()
        return obj
    })
    console.log(arr4)
    document.write(JSON.stringify(arr4))
}

export default FilterData