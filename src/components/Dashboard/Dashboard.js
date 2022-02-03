
import React, { useState, useEffect } from 'react';

import axios from 'axios';;




export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [round, setRound] = useState(0);
  const [total, setTotal] = useState(0);
  const [sections, setSections] = useState(200);
  const [progress, setProgress] = useState(0);


  function onReaderLoad(event) {
    const obj = JSON.parse(event.target.result);
    if (obj) {
      setFile(obj)
    }
  }
  const handleChange = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(files[0])
  }

  const upload = async (currPage = 1, datas) => {
    try {
      setLoading(true);
      setRound(currPage)
      const count = datas.length;
      let page = currPage;
      let limit = sections;
      let totalPages = Math.ceil(count / sections)
      setTotal(count)

      const sliced = file.slice((page - 1) * limit, limit * page)

      const { data } = await axios.post('https://dev.api.uhandisi.net/api/v2/integrations/partners/oaf/policy', sliced, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      if (data && page < totalPages) {
        upload(page + 1, datas)
      } else {
        setLoading(false)
        return 'finished';
      }

    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await upload(1, file)
  }

  const showProgress = (sec, rnd) => {
    const prog = sections * round;
     setProgress(prog > total ? total : prog)
  }

  useEffect(()=>{
    showProgress(sections, round)
  },[round])

  return (
    <>
     <div className="container">
        <p>Total records: {total}</p>
        <p>Uploading {progress} out of {total}</p>
      
      {loading ? <p>Uploading...</p> : <form  className="form-wrapper" onSubmit={handleSubmit} >
        <input type='file' name='jsonfiles' onChange={handleChange}  className="file-upload-field" required />
        <button type='submit'>Start upload</button>
      </form>}
      </div>
    </>
  );
}

