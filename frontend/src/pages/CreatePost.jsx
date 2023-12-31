import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {

  // we will use this to navigate back to home page once the post is created
  const navigate = useNavigate();

  // to show what we are typing in the input field
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  // we will use this while we are making contact with out API,
  // and while we are waiting to get back our image
  const [generatingImg, setGeneratingImg] = useState(false);
  
  // for general Loading
  const [loading, setLoading] = useState(false);


  const generateImage = async () => {

    if(form.prompt) {
      try {
        setGeneratingImg(true);

        const response = await fetch("https://dall-e-oth4.onrender.com/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })

      } catch (error) {
        alert(error);
      } finally {
        // whatever happens, this will run
        setGeneratingImg(false);
      }
    }
    else {
      alert('Please enter a prompt');
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();  // ensure that browser doesn't automatically reload our application


    if(form.prompt  &&  form.photo) {

      setLoading(true);

      try {
        
        const response = await fetch('https://dall-e-oth4.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json();
        navigate('/');

      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }

    }

    else {
      alert('Please enter a prompt and generate an image');
    }


  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className='max-w-7xl mx-auto'>

      <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
                Create
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
                Create imaginative and visually stunning images through MIDJOURNEY AI and share them with the community
            </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit} >

        <div className='flex flex-col gap-5'>

          {/* FormField is a component that we created */}
          <FormField 
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Omkar"
            value={form.name}
            handleChange={handleChange}
          />

          {/* isSurpriseMe will tell whether we want to show an additional button with this TextField or not*/}
          <FormField 
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* creating a place where AI generated Image will be shown, but also we will show a preview of the image in case it hasn't been already generated */}
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>

            {form.photo ? (
              <img
               src={form.photo}
               alt={form.prompt}
               className='w-full h-full object-contain'
              />
            ) : (
              <img
               src={preview}
               alt="preview"
               className='w-9/12 h-9/12 object-contain opacity-40' 
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}

          </div>

        </div>

        <div className='mt-5 flex gap-5'>
            <button
              type="button"
              onClick={generateImage}
              className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Once you have created the image you want, you can share it with others in the community.
          </p>

          <button
            type="submit"
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>

      </form>
      

    </section>
  )
}

export default CreatePost
