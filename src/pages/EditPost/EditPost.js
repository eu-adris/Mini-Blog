import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useFetchDocument } from '../../hooks/useFetchDocuments'

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument("Posts", id)


    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [FormError, setFormError] = useState('');

    useEffect(() => {

        if (post) {
            setTitle(post.title)
            setImage(post.image);
            setBody(post.body);

            const textTags = post.tagsArray.join(",");

            setTags(textTags)
        }

    }, [post]);

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument('posts')

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

        if (!title || !image || !tags || !body) {
            setFormError('Todos os campos são obrigatórios.')
        }

        if (FormError) return

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
        <div className={styles.edit_post}>
            <h2>Criar post </h2>
            <p>Altere os dados do post como achar melhor.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título</span>
                    <input type="text" name="title" required placeholder='Pense num bom título...' onChange={(e) => setTitle(e.target.value)} value={title} />
                </label>
                <label>
                    <span>URL da imagem</span>
                    <input type="text" name="title" required placeholder='Insira uma imagem' onChange={(e) => setImage(e.target.value)} value={image} />
                </label>
                <p className={styles.preview_title}>Preview da imagem</p>
                <img className={styles.image_preview} />
                <label>
                    <span>Conteudo:</span>
                    <textarea name="body" required placeholder='Insira o conteudo do post' onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                </label>
                <label>
                    <span>Tags</span>
                    <input type="text" name="tags" required placeholder='insíra as tags separadas por vírgula num bom título...' onChange={(e) => setTags(e.target.value)} value={tags} />
                </label>
                {!response.loading && <button className='btn'>Editar</button>}
                {response.loading && (<button className='btn' disabled>aguarde...</button>)}
                {response.error && <p className='error'>{response.error}</p>}
                {FormError && <p className='error'>{FormError}</p>}
            </form>
        </div>
    )
}

export default EditPost