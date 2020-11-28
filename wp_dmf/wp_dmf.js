// developer: https://github.com/theoromeo
// have any feedback, let me know.
// thanks for using WP_dmf
class WP_dmf
{
  constructor(_objectRef,_containerElement,_dataStoreFormName)
  {
    this.init()
    if (!_objectRef) 
    {
      console.error(this.info.name+":No Object Ref Name Passed")
      return 0
    }
    if(!_containerElement)
    {
      console.error(this.info.name+":No Container Ref Passed")
      return 0
    }
    if (_dataStoreFormName) 
    {
      this.dataStoreFormName = _dataStoreFormName
    }
    else
    {
      console.warn(this.info.name+":\nNo dataStoreFormName defined. \nWill use default: \nUse value '"+this.dataStoreFormName+"' on $_POST[] to retrieve data ")
    }

    this.objectRef = _objectRef
    this.containerElement = document.getElementById(_containerElement)
    this.createDataStoreField()

  }



  // Define default States
  init()
  {
    this.info =
    {
      name:'wp_dmf',
      version:'1.0.0',
      defaultDataStoreFormName:'wp_dmf_dataStore',
      refToRootAtributeName:'wp_dmf_ref',
      rootAttributeName:'wp_dmf_root',
      definedFieldName:'dmf_field_name',
      fieldName:'dmf_name',
      dataStoreFormID:'wp_dmf_dataStore_init_align_none'
    }

    this.dataStore = {}
    this.dataStoreForm = ''
    this.containerElement = ''
    this.fieldCount = 0
    this.definedFields = {}
    this.objectRef =''
    this.dataStoreFormName = this.info.defaultDataStoreFormName

    
  }
  // create field that will be used to store and send data from form
  createDataStoreField()
  {
    this.dataStoreForm =document.createElement("input")
    this.dataStoreForm.setAttribute("type","hidden")
    this.dataStoreForm.setAttribute("name",this.dataStoreFormName)
    this.dataStoreForm.setAttribute("value",'')
    this.dataStoreForm.setAttribute("id",this.info.dataStoreFormID)
    this.containerElement.appendChild(this.dataStoreForm)

  }

  setValue(_fieldID,_attrName,_value)
  {
    let root = document.querySelector("["+this.info.rootAttributeName+"='"+_fieldID+"']")
    let child = root.querySelector('['+this.info.fieldName+'="'+_attrName+'"]');
    child.value = _value


    if (this.dataStore[_fieldID] == null) 
    {
      let definedfield = root.getAttribute(this.info.definedFieldName) 
      let attr = this.info.definedFieldName
      this.dataStore[_fieldID] = {attr:definedfield}
      console.log("dataStore:")
      console.log(this.dataStore[_fieldID])

    }
    this.dataStore[_fieldID][_attrName]=_value
    console.log(this.dataStore)
    this.dataStoreForm.value = JSON.stringify(this.dataStore)


  }

  // add Field To defined Container 
  addField(_fieldName)
  {

    let rootContainer = document.createElement('div')
    rootContainer.setAttribute(this.info.rootAttributeName,this.fieldCount)
    rootContainer.setAttribute(this.info.definedFieldName,_fieldName)
    rootContainer.innerHTML = this.definedFields[_fieldName]
    this.nodeFormat(rootContainer);
    this.fieldCount++
    this.containerElement.insertAdjacentHTML('beforeend',rootContainer.outerHTML)

    let returnVal = rootContainer.getAttribute(this.info.rootAttributeName)
    return returnVal

  }

  // add IDs ref to children that are inputs
  nodeFormat(_e)
  {
    let nodes = _e.querySelectorAll('input')

    nodes.forEach((_child) => {
      let tagname = _child.tagName;
      _child.setAttribute(this.info.refToRootAtributeName,this.fieldCount)
      _child.setAttribute("onchange",this.objectRef+".store(this)")
    }) 
  }

  // define a field
  defineField(_fieldName , _html)
  {
    this.definedFields[_fieldName] = _html

  }
  delete(_id)
  {
    try
    {
      document.querySelector("["+this.info.rootAttributeName+"='"+_id+"']").remove()
      delete this.dataStore[_id]
    }
    catch(error)
    {console.error(this.info.name+": ERROR\nThis index probably doesnt exist\n"+error)}
  }
  // save field to dataStore
  store(_e)
  {
    console.info("Saving data to form input")
    let root = _e.getAttribute(this.info.refToRootAtributeName)
    let fieldName = _e.getAttribute(this.info.fieldName)
    let fieldValue = _e.value

    if (this.dataStore[root] == null) 
    {
      let rootNode = document.querySelector("["+this.info.rootAttributeName+"='"+root+"']");
      let definedfield = rootNode.getAttribute(this.info.definedFieldName) 
      let attr = this.info.definedFieldName
      this.dataStore[root] = {attr:definedfield}
    }
    this.dataStore[root][fieldName]=fieldValue
    console.log(this.dataStore)
    this.dataStoreForm.value = JSON.stringify(this.dataStore)

  }

  // if 
  restore(_data)
  {
    if (_data) 
    {
      let data = _data
    let currentFieldID = 0;
    data = JSON.parse(data)
    data = Object.entries(data)

    for(let key1 in data)
    {
      if (data.hasOwnProperty(key1)) 
      {
        let fieldItem = data[key1][1]

        for(let key2 in fieldItem)
        {
         if (fieldItem.hasOwnProperty(key2)) 
         {
          let iterData = fieldItem[key2]
          console.log("iterdata is: " + iterData + " === " + key2)
          if (key2 == "attr") 
          {
            currentFieldID = this.addField(iterData)
            console.log("attr at Key 2:"+currentFieldID)
          }
          else
          {
            console.log("not attr "+ key2)
            this.setValue(currentFieldID,key2,iterData)

          }
        }
        console.log("id: "+ currentFieldID)
      }
      console.log("-")
    }
  }
    }

  }


}