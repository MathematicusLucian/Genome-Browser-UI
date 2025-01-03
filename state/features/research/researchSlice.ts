import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface RsidState {
  data: any[] // Adjust the type as needed based on the API response
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Initial state
const initialState: RsidState = {
  data: [],
  status: 'idle',
  error: null,
}

// Async thunk for fetching data
export const fetchRsids = createAsyncThunk(
  'rsid/fetchRsids',
  async (rsidsList: string[], { rejectWithValue }) => {
    try {
      console.log('fetchRsids', rsidsList)
      const rsidsJson = {
        rsidsList: rsidsList,
      }
      const response = await axios.post('http://127.0.0.1:8000/snp_research/', rsidsJson)
      console.log('fetchRsids response', response.data)
      return response.data
    } catch (err: any) {
      console.log('fetchRsids error', err.response?.data || err.message)
      return rejectWithValue(err.response?.data || err.message)
    }
  },
)

const rsidSlice = createSlice({
  name: 'rsid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRsids.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchRsids.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchRsids.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export default rsidSlice.reducer
