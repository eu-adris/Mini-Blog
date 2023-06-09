import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import {useInsertDocument} from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [FormError, setFormError] = useState('');

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument('posts')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    // validade image IRL
    try {

      new URL(image)
      
    } catch (error) {
      setFormError('A imagem precisa ser uma URL. ')
    }


    // criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())


    // checar todos os valores

    if(!title || !image || !tags || !body){
      setFormError('Todos os campos são obrigatórios.')
    }

    if(FormError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirect to home-page
    navigate('/')
    

  }


  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input type="text" name="title" required placeholder='Pense num bom título...' onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>URL da imagem</span>
          <input type="text" name="title" required placeholder='Insira uma imagem' onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
        <label>
          <span>Conteudo:</span>
          <textarea name="body" required placeholder='Insira o conteudo do post' onChange={(e) => setBody(e.target.value)} value={body}></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input type="text" name="tags" required placeholder='insíra as tags separadas por vírgula num bom título...' onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
        {!response.loading && <button className='btn'>Criar</button>}
        {response.loading && (<button className='btn' disabled>aguarde...</button>)}
        {response.error && <p className='error'>{response.error}</p>}
        {FormError && <p className='error'>{FormError}</p>}
      </form>
    </div>
  )
}

export default CreatePost